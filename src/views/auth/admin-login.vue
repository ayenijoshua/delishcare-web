<template>
    <div id="">
    <main>
        <div class="p-t-b-100 height-full bg-green" style="background-image: url('assets/img/bg-wall2.png');">
            <div class="container">
                <div class="row">
                    <div class="col-lg-7 mx-md-auto">
                        <div class="text-center">
                            <img class="img-responsive" src="/assets/img/logo-white.png" style= "max-width: 100%;" alt="">
                            <p class="p-t-b-20 text-white">Back Office, signin...</p>
                        </div>
                        <form @submit.prevent="loginUser()">
                            <div class="row">
                                <div class="col-lg-6">
                                    <div class="form-group has-icon"><i class="icon-user"></i>
                                        <input type="text" v-model="form.email" class="form-control form-control-lg no-b"
                                            placeholder="email" >
                                    </div>
                                </div>
                                <div class="col-lg-6">
                                    <div class="form-group has-icon"><i class="icon-lock"></i>
                                        <input type="password" v-model="form.password" class="form-control form-control-lg no-b"
                                            placeholder="Password">
                                            
                                    </div>
                                </div>
                                <div class="col-lg-12">
                                    <span v-if="submitting && logSubmitting" class="btn btn-success btn-lg btn-block">...</span>
                                    <input v-else type="submit" class="btn btn-success btn-lg btn-block" value="Login">
                                </div>
                            </div>
                        </form>
                        <div class="row">
                            <div class="text-center ml-3">
                                <p class="forget-pass text-white text-center">Have you forgotten your username or password ? 
                                    <a href="" class="font-weight-bold" :style="{'text-decoration':'none'}"  data-toggle="collapse" data-target="#collapse1" aria-expanded="true" aria-controls="collapseOne">
                                        Retrieve Here
                                    </a>
                                </p>
                            </div>
                            
                            <div id="collapse1" class="collapse hidden col-lg-12" aria-labelledby="headingOne" data-parent="#accordionExample" style="">
                                <form @submit.prevent="submitReset()">
                                    <div class="col-lg-12">
                                        <div class="form-group has-icon"><i class="icon-envelope-o"></i>
                                            <input required type="text" v-model="reset_form.email" class="form-control form-control-lg no-b" placeholder="Enter Your Email">
                                        </div>
                                    </div>
                                    <div class="col-lg-12 text-center">
                                        <span v-if="submitting && resetSubmitting" class="btn btn-success btn-lg btn-block">...</span>
                                        <input v-else type="submit"  class="btn btn-success btn-lg btn-block" value="Reset Password">
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </main>
</div>
</template>
<script>
import {mapActions,mapState} from 'vuex'
export default {

    data(){
        return{
            form:{
                email:null,
                password:null
            },
            reset_form:{
                email:null,
                user_type:'admin'
            },
            resetSubmitting:false,
            logSubmitting:false
        }
    },

    computed:{
        ...mapState({
            submitting:state=>state.submitting
        })
    },
    
    methods:{
        ...mapActions('authStore',['adminLogin','resetPasswordLink']),

        loginUser(){ 
           this.logSubmitting = true
            this.adminLogin(this.form).then(()=>this.logSubmitting = false)
        },

        submitReset(){
            this.resetSubmitting = true
            this.resetPasswordLink(this.reset_form).then(()=>this.resetSubmitting = false)
        }
    }
}
</script>