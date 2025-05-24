<template>
  <q-page padding>
    <div class="row justify-between items-center q-mb-md">
      <div class="text-h6">聯絡人列表</div>
      <q-btn label="新增聯絡人" to="/insert" color="primary" />
    </div>

    <q-table
      :rows="contacts"
      :columns="columns"
      row-key="id"
      flat
    >
      <template v-slot:body-cell-actions="props">
        <q-td :props="props">
          <q-btn 
            color="primary" 
            icon="edit" 
            flat 
            dense 
            class="q-mr-sm"
            :to="`/edit/${props.row.id}`"
            label="編輯"
          />
          <q-btn 
            color="negative" 
            icon="delete" 
            flat 
            dense 
            @click="deleteContact(props.row.id)"
            label="刪除"
          />
        </q-td>
      </template>
    </q-table>
    
    

    <q-banner v-if="error" class="q-mt-md" color="red" text-color="white">
      無法取得資料，請稍後再試
    </q-banner>
  </q-page>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

const contacts = ref([])
const error = ref(false)

const columns = [
  { name: 'name', label: '姓名', field: 'name', align: 'left' },
  { name: 'gender', label: '性別', field: 'gender', align: 'left' },
  { name: 'address', label: '住址', field: 'address', align: 'left' },
  { name: 'phone', label: '電話', field: 'phone', align: 'left' },
  { name: 'birthday', label: '生日', field: 'birthday', align: 'left' },
  { name: 'email', label: '電子郵件', field: 'email', align: 'left' },
  { name: 'actions', label: '操作', field: 'id', align: 'left', sortable: false}
]

onMounted(async () => {
  try {
    const res = await axios.get('http://localhost:3000/api/contacts')
    contacts.value = res.data
  } catch (err) {
    console.error(err)
    error.value = true
  }
})
const deleteContact = async (id) => {
  if (!confirm('確定要刪除這筆聯絡資料嗎？')) return

  try {
    const res = await axios.delete(`http://localhost:3000/api/contacts/${id}`)
    contacts.value = contacts.value.filter(c => c.id !== id)
    alert(res.data.message)
  } catch (err) {
    console.error(err)
    alert('刪除失敗')
  }
}
</script>
