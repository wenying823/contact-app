<template>
  <q-page padding>
    <q-form @submit.prevent="submitForm" ref="formRef">
      <q-input v-model="form.name" label="姓名" :rules="[v => !!v || '必填']" lazy-rules />
      <q-select v-model="form.gender" label="性別" :options="['男', '女']" :rules="[v => !!v || '必填']" lazy-rules />
      <q-input v-model="form.address" label="住址" />
      <q-input v-model="form.phone" label="電話" type="tel" />
      <q-input
        v-model="form.birthday"
        label="生日"
        readonly
        >
        <template #append>
            <q-icon name="event" class="cursor-pointer">
            <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                <q-date 
                v-model="form.birthday" 
                mask="YYYY-MM-DD" 
                @update:model-value="() => $refs.datePopup.hide()" 
                ref="datePopup"
                />
            </q-popup-proxy>
            </q-icon>
        </template>
    </q-input>
      <q-input v-model="form.email" label="電子郵件" type="email" :rules="[v => !!v || '必填']" lazy-rules />

      <div class="q-mt-md">
        <q-btn label="送出" type="submit" color="primary" />
        <q-btn label="返回列表" flat to="/index" class="q-ml-sm" />
      </div>
    </q-form>
  </q-page>
</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios'

const formRef = ref(null)
const success = ref(false)

const form = ref({
  name: '',
  gender: '',
  address: '',
  phone: '',
  birthday: '',
  email: ''
})

const submitForm = async () => {
  const valid = await formRef.value.validate()
  if (!valid) return

  try {
    await axios.post('http://localhost:3000/api/contacts', form.value)

    formRef.value.resetValidation()
    success.value = true
    form.value = {
      name: '',
      gender: '',
      address: '',
      phone: '',
      birthday: '',
      email: ''
    }
    alert('資料已送出！');
  } catch (err) {
    console.error(err)
    alert('送出失敗，請稍後再試')
  }
}
</script>
