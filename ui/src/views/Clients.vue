<template>
  <div>
    <div class="title">
      <span>{{ !display ? "List of clients" : display + " a Client" }}</span>
    </div>
    <md-table v-model="clients" md-sort="name" md-sort-order="asc" md-card>
      <md-table-toolbar>
        <h1 class="md-title">Clients</h1>
        <Dialog @displayEditOrNew="displayEditOrNew" />
      </md-table-toolbar>

      <md-table-row slot="md-table-row" slot-scope="{ item }">
        <md-table-cell md-label="Name" md-sort-by="name">{{
          item.name
        }}</md-table-cell>
        <md-table-cell md-label="Email" md-sort-by="email">{{
          item.email
        }}</md-table-cell>
        <md-table-cell md-label="Phone" md-sort-by="phone">{{
          item.phone
        }}</md-table-cell>
        <md-table-cell md-label="Providers">{{
          item.providers.map((e) => "Provider" + e).join()
        }}</md-table-cell>
        <md-table-cell>
          <Dialog @displayEditOrNew="displayEditOrNew" :form="item" />
        </md-table-cell>
      </md-table-row>
    </md-table>
  </div>
</template>

<script>
import Dialog from "@/components/Dialog.vue";
import { api } from "@/helpers/api.js";
export default {
  name: "Clients",
  components: {
    Dialog,
  },
  data: () => {
    return {
      clients: [],
      display: "",
    };
  },
  methods: {
    displayEditOrNew: function (dialogData) {
      return (this.display = dialogData);
    },
  },
  async mounted() {
    var clients = await api.getClients();
    clients.map((e) => (e.providers = e.providers.map((e) => String(e.id))));
    return (this.clients = clients);
  },
};
</script>

<style>
.title {
  font-size: 2rem;
  height: 3rem;
}
</style>
