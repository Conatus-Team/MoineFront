<template>
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
    <div class="container-fluid">
      <b-editable-table
        :busy="loading"
        bordered
        striped
        class="editable-table"
        v-model="items"
        :fields="fields"
        @head-clicked="headClicked"
      >
        <!-- <template #cell(roomUUID)="data">
          <div class="w-100 text-truncate">{{ data.value }}</div>
        </template> -->

        <template #cell(isChecked)="data">
          <div id="align-center">
            <!-- <span v-if="data.value"><b-form-checkbox checked="true" /></span>
            <span v-else><b-form-checkbox checked="false" /></span> -->

            <!-- <span v-if="data.value">✅</span>
            <span v-else>❌</span> -->
            <div class="float-center">
              <b-checkbox
                key="data.id"
                v-model="data.item.isChecked"
                @change="clickCheckbox(data, 'isChecked')"
              />
            </div>
          </div>
        </template>

        <template #cell(isDeleted)="data">
          <div class="text-center">
            <b-checkbox
              key="data.id"
              v-model="data.item.isDeleted"
              @change="clickCheckbox(data, 'isDeleted')"
            />
          </div>
        </template>
      </b-editable-table>

      <div class="absolute-center">
        <button class="btn btn-primary" type="button" @click="findBefore">
          이전
        </button>
        {{ page + 1 }} / {{ totalPages }}
        <button class="btn btn-primary" type="button" @click="findNext">
          이후
        </button>
        <div class="float-right">
          <button class="btn btn-primary" type="button" @click="checkAll">
            모두 체크
          </button>

          <button class="btn btn-primary" type="button" @click="save">
            저장
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import HeaderBar from "@/components/HeaderBar";
import BEditableTable from "bootstrap-vue-editable-table";
import lodash from "lodash";
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
      console.log(
        `http://localhost:8080/chat/data/get/pagesort?page=${this.page}&size=${this.size}&sortColumn=${this.sortBy}&sortOrder=${this.sortDirection}`
      );
      this.$axios
        .get(
          `http://localhost:8080/chat/data/get/pagesort?page=${this.page}&size=${this.size}`
        )
        .then((response) => {
          const content = response.data.content;
          const { first, last, totalElements, totalPages } = response.data;
          this.last = last;
          this.first = first;
          this.totalElements = totalElements;
          this.totalPages = totalPages;
          const keys = Object.keys(content[0]);

          const exceptKeys = [];
          const editableKeys = { answer: "text" };
          const keyWidth = {
            id: "1rem",
            isChecked: "1rem",
            score: "1rem",
            question: "20rem",
            answer: "20rem",
            isDeleted: "1rem",
          };
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
                thStyle: { width: "13rem" },
                tdClass: "text-center",
              };
              if (Object.keys(editableKeys).includes(key)) {
                field.editable = true;
                field.type = editableKeys[key];
              }
              if (Object.keys(keyWidth).includes(key)) {
                field.thStyle.width = keyWidth[key];
              }
              this.fields.push(field);
            });
            // this.fields.push({ key: "actions", class: "text-center" });
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
      this.findByColumnOrderBy();
    },
    findNext() {
      if (this.last !== true) {
        this.page = this.page + 1;
        this.findByColumnOrderBy();
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
      this.page = 0;
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
      this.findByColumnOrderBy();
    },
    checkAll() {
      this.allChecked = !this.allChecked;

      this.items = this.items.map((item) => {
        item.isChecked = this.allChecked;
        return item;
      });
    },
    save() {
      console.log(this.items);
      try {
        this.$axios
          .patch(`http://localhost:8080/chat/data/many`, this.items)
          .then((response) => {
            this.items = lodash.cloneDeep(response.data);
            console.log(this.items);
            alert("저장되었습니다");
          });
      } catch (err) {
        console.err(err);
        alert("저장 실패");
      }
    },
    clickCheckbox(data, value) {
      console.log(value);
      this.items[data.index][value] = data.item[value];
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

#align-center {
  float: center !important;
}

.editable-table {
}

td {
  text-align: center;
}
</style>
