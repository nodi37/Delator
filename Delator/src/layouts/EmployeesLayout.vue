<script>
import AddUserForm from '@/components/AddUserForm.vue';
import AddBtn from '@/components/UI/AddBtn.vue';
import Dialog from '@/components/Dialog.vue';

export default {
  name: "EmployeeLayout",
  data: () => ({
    dialogVisible: false,
  }),
  methods: {
  },
  components: { AddUserForm, AddBtn, Dialog }
}
</script>

<template>
  <div>
    <Dialog v-model="dialogVisible" title="add-employee">
      <AddUserForm />
    </Dialog>
    <AddBtn @onClick="dialogVisible=true" />
  </div>
</template>