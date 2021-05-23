<template>
  <div>
    <md-dialog :md-active.sync="showDialog">
      <md-dialog-title class="dialog">
        {{ form._id ? "Edit" : "New" }} Client</md-dialog-title
      >
      <form action="#" @submit.prevent="onSubmit">
        <div class="md-layout-item md-small-size-100 space">
          <md-field :class="getValidationClass('name')">
            <label for="name">Name</label>
            <md-input name="name" id="name" v-model="client.name" />
            <span class="md-error" v-if="!$v.client.name.required"
              >The name is required</span
            >
            <span class="md-error" v-else-if="!$v.client.name.minlength"
              >At least 3 letters</span
            >
          </md-field>
        </div>

        <div class="md-layout-item md-small-size-100 space">
          <md-field :class="getValidationClass('email')">
            <label for="email">Email</label>
            <md-input name="email" id="email" v-model="client.email" />
            <span class="md-error" v-if="!$v.client.email.email"
              >Invalid email</span
            >
          </md-field>
        </div>

        <div class="md-layout-item md-small-size-100 space">
          <md-field :class="getValidationClass('phone')">
            <label for="phone">Phone</label>
            <md-input name="phone" id="phone" v-model="client.phone" />
            <span class="md-error" v-if="!$v.client.phone.required"
              >The phone is required</span
            >
            <span class="md-error" v-else-if="!$v.client.name.minlength"
              >At least 3 digits</span
            >
          </md-field>
        </div>

        <md-field class="space">
          <label for="providers">Providers</label>
          <md-select
            v-model="form.providers"
            name="providers"
            id="providers"
            multiple
          >
            <md-option value="1">Provider 1</md-option>
            <div class="icons">
              <span style="paddingright: 20px" class="material-icons"
                >post_add</span
              >
              <span class="material-icons">delete</span>
            </div>
            <md-option value="2">Provider 2</md-option>
            <div class="icons">
              <span style="paddingright: 20px" class="material-icons"
                >post_add</span
              >
              <span class="material-icons">delete</span>
            </div>
            <md-option value="3">Provider 3</md-option>
            <div class="icons">
              <span style="paddingright: 20px" class="material-icons"
                >post_add</span
              >
              <span class="material-icons">delete</span>
            </div>
            <md-option value="4">Provider 4</md-option>
            <div class="icons">
              <span style="paddingright: 20px" class="material-icons"
                >post_add</span
              >
              <span class="material-icons">delete</span>
            </div>
            <md-option value="5">Provider 5</md-option>
            <div class="icons">
              <span style="paddingright: 20px" class="material-icons"
                >post_add</span
              >
              <span class="material-icons">delete</span>
            </div>
          </md-select>
        </md-field>

        <md-dialog-actions :class="form._id ? 'actions dlt' : 'actions'">
          <md-button
            v-if="form._id"
            @click.prevent="onDestroy(form._id)"
            class="md-accent"
            >Delete</md-button
          >
          <div>
            <md-button class="md-primary" @click="cancel()">Cancel</md-button>
            <md-button type="submit" class="md-primary"
              >{{ form._id ? "Save" : "Add" }} Client</md-button
            >
          </div>
        </md-dialog-actions>
      </form>
    </md-dialog>

    <md-button
      v-if="!form._id"
      @click="handleDialog('Adding')"
      class="md-dense md-raised md-primary"
      >New Client</md-button
    >
    <md-button
      v-if="form._id"
      @click="handleDialog('Editing')"
      class="md-primary"
      >Edit/Delete</md-button
    >
  </div>
</template>

<script>
import { validationMixin } from "vuelidate";
import {
  required,
  email,
  minLength,
  maxLength,
} from "vuelidate/lib/validators";
import { api } from "@/helpers/api.js";
export default {
  name: "Dialog",
  mixins: [validationMixin],
  props: {
    form: {
      type: Object,
      required: false,
      default: () => {
        return {
          name: "",
          email: "",
          phone: "",
          providers: [],
        };
      },
    },
  },
  data() {
    return {
      showDialog: false,
      client: this.form,
    };
  },
  validations: {
    client: {
      name: {
        required,
        minLength: minLength(3),
        maxLength: maxLength(15),
      },
      phone: {
        required,
        minLength: minLength(3),
      },
      email: {
        email,
      },
    },
  },
  methods: {
    handleDialog(val) {
      this.showDialog = true;
      this.$emit("displayEditOrNew", val);
    },
    getValidationClass(fieldName) {
      const field = this.$v.client[fieldName];

      if (field) {
        return {
          "md-invalid": field.$invalid && field.$dirty,
        };
      }
    },
    onSubmit: async function () {
      this.$v.$touch();

      const form = Object.assign({}, this.form);
      const providers = this.form.providers;
      const providersForm = [];
      for (const element of providers) {
        providersForm.push({ id: element });
      }

      if (!this.$v.$invalid) {
        if (this.form._id) {
          form.providers = providersForm;
          this.showDialog = false;
          return await api.updateClient(form);
        }
        window.location.reload();
        return await api.createClient({
          name: this.form.name,
          email: this.form.email,
          phone: this.form.phone,
          providers: providersForm,
        });
      }
      return;
    },
    cancel() {
      window.location.reload();
      this.showDialog = false;
    },
    async onDestroy(id) {
      const sure = window.confirm("Are you sure?");
      if (!sure) return;
      this.showDialog = false;
      window.location.reload();
      return await api.deleteClient(id);
    },
  },
};
</script>

<style lang="scss" scoped>
.md-dialog .md-dialog-container {
  max-width: 48rem;
}

.md-field {
  width: 80%;
  margin: auto;
}

.dialog {
  min-width: 43.75rem;
  border-bottom: 0.5px solid grey;
  padding-bottom: 1.25rem;
}

.icons {
  position: relative;
  bottom: 2.375rem;
  left: 11.875rem;
  height: 0rem;
  width: 0rem;
}

@media screen and (max-height: 650px) {
  .dialog {
    display: none;
  }
  .actions {
    margin-top: 0rem !important;
    border: none !important;
  }
}

.space {
  margin-top: 1rem;
}

.actions {
  border-top: 0.5px solid grey;
  margin-top: 6.25rem;
}

.dlt {
  justify-content: space-between;
}
</style>
