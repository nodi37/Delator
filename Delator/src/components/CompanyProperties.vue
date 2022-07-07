<script>
import axios from 'axios';
import CompanyCard from '@/components/CompanyCard';
import EditCompanyForm from './Forms/EditCompanyForm.vue';

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
        CompanyCard,
        EditCompanyForm
    }
}
</script>

<template>
    <div class="no-scroll-container">
        <CompanyCard :name="cardDetails.name" :description="cardDetails.description" :imgSrc="cardDetails.logo"
            :createDate="cardDetails.createDate" />
        <div class="scroll-container">

            <EditCompanyForm v-on:savedData="updateData" :companyData="companyData" />

        </div>
    </div>
</template>