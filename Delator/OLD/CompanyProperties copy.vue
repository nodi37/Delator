<script>
import axios from 'axios';
import ItemCard from '@/components/UI/ItemCard';
import EditCompanyForm from '@/components/Forms/Edit/EditCompanyForm.vue';

export default {
    name: 'CompanyProperties',
    data: () => ({
        companyData: {},
        cardDetails: {},
        form: ''
    }),
    methods: {
        loadCompanyData() {
            axios.get(process.env.VUE_APP_API_PATH + `/company/${this.$route.params.companyId}`)
                .then(res => {
                    this.companyData = res.data.data;
                    this.cardDetails = JSON.parse(JSON.stringify(res.data.data));
                });
        },
        updateData(val) {
            this.companyData = val;
            this.cardDetails = JSON.parse(JSON.stringify(val));
        }
    },
    mounted: function () {
        this.loadCompanyData();
    },
    components: {
        ItemCard,
        EditCompanyForm
    }
}
</script>

<template>
    <div class="no-scroll-container">
        <ItemCard :name="cardDetails.companyName" :description="cardDetails.companyDescription" :imgSrc="cardDetails.logo"
            :createDate="cardDetails.createDate" />
        <div class="scroll-container">

            <EditCompanyForm v-on:savedData="updateData" :companyData="companyData" />
            
        </div>
    </div>
</template>