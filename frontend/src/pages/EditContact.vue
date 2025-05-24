<template>
  <q-page padding>
    <div class="text-h6 q-mb-md">編輯聯絡人</div>

    <q-form @submit.prevent="updateContact" ref="formRef">
      <q-input v-model="contact.name" label="姓名" :rules="[v => !!v || '必填']" lazy-rules class="q-mb-sm" />
      <q-select v-model="contact.gender" label="性別" :options="['男', '女']" :rules="[v => !!v || '必填']" lazy-rules class="q-mb-sm" />
      <q-input v-model="contact.address" label="住址" class="q-mb-sm" />
      <q-input v-model="contact.phone" label="電話" type="tel" class="q-mb-sm" />

      <q-input v-model="contact.birthday" label="生日" readonly class="q-mb-sm">
        <template #append>
          <q-icon name="event" class="cursor-pointer">
            <q-popup-proxy cover transition-show="scale" transition-hide="scale">
              <q-date
                v-model="contact.birthday"
                mask="YYYY-MM-DD"
                @update:model-value="() => $refs.datePopup?.hide()"
                ref="datePopup"
              />
            </q-popup-proxy>
          </q-icon>
        </template>
      </q-input>

      <q-input v-model="contact.email" label="電子郵件" type="email" :rules="[v => !!v || '必填']" lazy-rules class="q-mb-sm" />

      <div class="q-mt-md">
        <q-btn label="儲存" type="submit" color="primary" />
        <q-btn label="返回列表" flat to="/index" class="q-ml-sm" />
      </div>
    </q-form>
  </q-page>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import axios from 'axios'

const route = useRoute()
const router = useRouter()

const formRef = ref(null)
const contact = ref({
  name: '',
  gender: '',
  address: '',
  phone: '',
  birthday: '',
  email: ''
})

onMounted(async () => {
  const id = route.params.id
  try {
    const res = await axios.get(`http://localhost:3000/api/contacts/${id}`)
    contact.value = res.data
  } catch (err) {
    console.error(err)
    alert('無法載入聯絡人資料')
  }
})

const updateContact = async () => {
  const valid = await formRef.value.validate()
  if (!valid) return

  const id = route.params.id
  try {
    const res = await axios.put(`http://localhost:3000/api/contacts/${id}`, contact.value)
    alert(res.data.message)
    router.push('/index')
  } catch (err) {
    console.error(err)
    alert('更新失敗')
  }
}
</script>