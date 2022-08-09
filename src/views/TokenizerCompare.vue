<template>
  <div>
    <div>
      <button class="btn btn-secondary" onclick="location.href=`/`">
        돌아가기
      </button>
    </div>
    <div class="container" id="app" v-cloak>
      <div>
        <h2>{{ room.name }}</h2>
      </div>
      <div class="input-group">
        <div class="input-group-prepend">
          <label class="input-group-text">내용</label>
        </div>
        <input
          type="text"
          class="form-control"
          v-model="message"
          v-on:keypress.enter="sendMessage"
        />
        <div class="input-group-append">
          <button class="btn btn-primary" type="button" @click="sendMessage">
            보내기
          </button>
        </div>
      </div>
      <ul class="list-group">
        <li
          class="list-group-item"
          v-for="message in messages"
          v-bind:key="message"
        >
          {{ message.sender }} - {{ message.message }}
        </li>
      </ul>
      <div></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ChatDataView",

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
      size: 10,
      page: 0,
      first: true,
      last: false,
      totalElements: 0,
      totalPages: 1,
    };
  },

  created() {
    this.findAllChatData();
  },

  methods: {
    findAllChatData() {
      this.$axios
        .get(
          `http://localhost:8080/chat/data/get/pageable?page=${this.page}&size=${this.size}`,
        )
        .then((response) => {
          const content = response.data.content;
          const { first, last, totalElements, totalPages } = response.data;
          this.last = last;
          this.first = first;
          this.totalElements = totalElements;
          this.totalPages = totalPages;
          const keys = Object.keys(content[0]);
          if (this.fields.length === 0) {
            keys.map((key) => {
              const field = {
                key: String(key),
                label: String(key),
                sortable: true,
              };
              this.fields.push(field);
            });
          }

          this.items = [];

          content.map((item) => {
            this.items.push(item);
          });
        });
    },
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
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
