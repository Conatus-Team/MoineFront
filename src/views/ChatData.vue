<template>
  <div>
    <div>
      <link
        href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css"
        rel="stylesheet"
        integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC"
        crossorigin="anonymous"
      />
      <HeaderBar title="채팅 내역 보기" />
      <!-- <b-table striped hover :items="items" :fields="fields"
        ><template
          v-for="field in editableFields"
          v-slot:[`cell(${field.key})`]="{ item }"
        >
          <b-input v-model="item[field.key]" />
        </template>
      </b-table> -->
      <b-editable-table
        :busy="loading"
        bordered
        class="editable-table"
        v-model="items"
        :fields="fields"
      >
        <template #table-colgroup="scope">
          <col
            v-for="field in scope.fields"
            :key="field.key"
            @click="handleClick"
        /></template>
        <template #cell(isChecked)="data">
          <span v-if="data.value">✅</span>
          <span v-else>❌</span>
        </template>
      </b-editable-table>
    </div>
    <div>
      <button class="btn btn-primary" type="button" @click="findBefore">
        이전
      </button>
      {{ page + 1 }} / {{ totalPages }}
      <button class="btn btn-primary" type="button" @click="findNext">
        이후
      </button>
    </div>
  </div>
</template>

<script>
import HeaderBar from "@/components/HeaderBar";
import BEditableTable from "bootstrap-vue-editable-table";
// import { BButton } from "bootstrap-vue";

export default {
  name: "ChatDataView",
  components: {
    HeaderBar,
    "b-editable-table": BEditableTable,
  },
  computed: {
    editableFields() {
      return this.fields.filter((field) => {
        return field.editable === true;
      });
    },
  },
  data() {
    return {
      // Note 'isActive' is left out and will not appear in the rendered table
      fields: [
        // {
        //   key: "id",
        //   sortable: true,
        //   editable: true,
        // },
        // {
        //   key: "first_name",
        //   sortable: false,
        // },
        // {
        //   key: "age",
        //   label: "Person age",
        //   sortable: true,
        //   // Variant applies to the whole column, including the header and footer
        //   variant: "danger",
        // },
      ],
      items: [],
      size: 12,
      page: 0,
      first: true,
      last: false,
      totalElements: 0,
      totalPages: 1,
      loading: false,
      sortBy: "id",
      sortDesc: false,
      sortDirection: "asc",
      isBusy: false,
      // eslint-disable-next-line vue/no-reserved-keys
      _helper: "",
      dataChanged: false,
      allChecked: false,
    };
  },

  // created() {
  //   this.findAllChatData();
  // },
  async mounted() {
    this.loading = true;
    this.findAllChatData();
    this.loading = false;
  },
  methods: {
    findAllChatData() {
      this.$axios
        .get(
          `http://localhost:8080/chat/data/get/pageable?page=${this.page}&size=${this.size}`
        )
        .then((response) => {
          const content = response.data.content;
          const { first, last, totalElements, totalPages } = response.data;
          this.last = last;
          this.first = first;
          this.totalElements = totalElements;
          this.totalPages = totalPages;
          const keys = Object.keys(content[0]);

          const exceptKeys = ["isDeleted"];
          const editableKeys = { answer: "text", isChecked: "checkbox" };

          // 필드
          if (this.fields.length === 0) {
            keys.map((key) => {
              if (exceptKeys.includes(key)) {
                return;
              }
              const field = {
                key: String(key),
                label: String(key),
                sortable: true,
              };
              if (Object.keys(editableKeys).includes(key)) {
                field.editable = true;
                field.type = editableKeys[key];
              }

              this.fields.push(field);
            });
            this.fields.push({ key: "actions", class: "text-center" });
          }

          this.items = [];

          content.map((item) => {
            this.items.push(item);
          });
        });
    },
    // handleInput(value, data) {},

    findBefore() {
      if (this.first === true) {
        return;
      }
      this.page = this.page - 1;
      this.findAllChatData();
    },
    findNext() {
      if (this.last !== true) {
        this.page = this.page + 1;
        this.findAllChatData();
      }
    },
    doEdit(item) {
      this.$set(item, "temp", JSON.parse(JSON.stringify(item)));
      this.$set(item, "editing", true);
    },
    doSave(item) {
      this.$set(item, "editing", false);
      // eslint-disable-next-line no-restricted-syntax
      for (const key in item.temp) {
        if (item[key] !== item.temp[key]) {
          // eslint-disable-next-line no-param-reassign
          item[key] = item.temp[key];
        }
      }
    },
    doCancel(item) {
      this.$set(item, "editing", false);
      this.$delete(item, "temp");
    },
    handleClick() {
      console.log("clicked");
    },
    findByColumnOrderBy() {
      console.log("데이터 로드");
      console.log(
        `http://localhost:8080/chat/data/get/pagesort?page=${this.page}&size=${this.size}&sortColumn=${this.sortBy}&sortOrder=${this.sortDirection}`
      );
      this.$axios
        .get(
          `http://localhost:8080/chat/data/get/pagesort?page=${this.page}&size=${this.size}&sortColumn=${this.sortBy}&sortOrder=${this.sortDirection}`
        )
        .then((response) => {
          const content = response.data.content;
          this.last = response.data.last;
          this.first = response.data.first;
          console.log(content);
          this.items = [];
          content.map((item) => {
            this.items.push(item);
          });
        });
    },
    headClicked(column) {
      // https://github.com/bootstrap-vue/bootstrap-vue/issues/1090
      console.log("head clicked");
      if (column == this._helper) {
        //change sorting order.
        this.sortDirection = this.sortDirection == "asc" ? "desc" : "asc";
      } else {
        this.sortDirection = "asc";
      }
      //set sorting column.
      this.sortBy = column;
      this._helper = column;
      console.log(`column, order = ${column}, ${this.sortDirection}`);
      this.findByColumnOrderBy(column, this.sortDirection);
    },
    checkAll() {
      this.allChecked = !this.allChecked;

      this.items = this.items.map((item) => {
        item.isChecked = this.allChecked;
        return item;
      });
      console.log(this.items);
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.btn-primary {
  margin: 1rem;
}

#align-right {
  float: right;
}
</style>
