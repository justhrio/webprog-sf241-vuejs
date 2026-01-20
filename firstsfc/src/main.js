import { createApp } from 'vue'

import App from './App.vue'
import FoodItem from './components/FoodItem.vue'
import FoodItem2 from './components/FoodItem2.vue'
// 1. Import the new file
import PersonalProfile from './components/PersonalProfile.vue' 

const app = createApp(App)

app.component('food-item', FoodItem)
app.component('food-item2', FoodItem2)
// 2. Register it here
app.component('personal-profile', PersonalProfile) 

app.mount('#app')