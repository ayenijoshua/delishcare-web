<template>
    <div>
        <header class="blue accent-3 relative">
            <div class="container-fluid text-blue">
                <div class="row justify-content-between">
                    <ul class="nav nav-material nav-material-white responsive-tab" id="v-pills-tab" role="tablist">
                        <li>
                            <a class="nav-link active" id="v-pills-Wallet-Detailed-Calculation-tab" data-toggle="pill" href="#v-pills-Wallet-Detailed-Calculation" role="tab" aria-controls="v-pills-Wallet-Detailed-Calculation" aria-selected="false"><i class="icon  icon-key6 "></i>Enable/Disable 2FA</a>
                        </li>
                        <li>
                            <a class="nav-link" id="v-pills-Withdrawal-History-tab" data-toggle="pill" href="#v-pills-Withdrawal-History" role="tab" aria-controls="v-pills-Withdrawal-History" aria-selected="false"><i class="icon icon-lock3 "></i>Change Password</a>
                        </li>
                    </ul>
                </div>
            </div>
        </header>

        <div class="animated">
            <div class="tab-content" id="v-pills-tabContent">
                <div class="tab-pane fade show active" id="v-pills-Wallet-Detailed-Calculation" role="tabpanel" aria-labelledby="v-pills-Wallet-Detailed-Calculation-tab">
                    <div class="row my-3 d-flex justify-content-center">
                        <div class="col-md-8">
                            <div class="card">
                                <div class="card border justify-content-center">
                                    <div class="card-body"> 
                                        <div class="text-center mt-2 mb-4"><img  src="/assets/img/private-account.png" width="80px" height="80px" alt=""></div>
                                        <div class="text-center mb-4">
                                            <h6 class="font-weight-bold text-green"><i class="icon-lock mr-2"></i>Login 2Factor Authentication</h6>
                                            <small>Disable or Enable Login 2FA Authentication</small>
                                            <div class="form-row mt-2">
                                                <div style="padding-left:250px">
                                                        <span v-if="authUser.enable_2fa"><b>Enabled</b></span><span v-else><b>Disabled</b></span> &nbsp;
                                                        <input type="checkbox" title="Toggle 2FA" v-b-popover.hover.top="'Click to enable/disable 2FA'" @click="toggle2fa()"  data-toggle="switchbutton"  :checked="authUser.enable_2fa" data-width="100"  data-onstyle="success" :style="{'accent-color': '#2E671A'}" />
                                                        Check to Enable | Uncheck to disable
                                                </div>
                                            </div>
                                        </div>	
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="tab-pane fade" id="v-pills-Withdrawal-History" role="tabpanel" aria-labelledby="v-pills-Withdrawal-History-tab">
                    <div class="row my-3">
                        <div class="col-md-6">
                            <div class="card">
                                <div class="card-header bg-white">
                                    <h6 class="green-text"><strong class="font-weight-bold">Send Confirmation Code</strong></h6>
                                </div>
                                <div class="card-body">
                                    <form @submit.prevent="sendCode()">
                                        <div class="form-row mb-3 d-flex justify-content-center">
                                            <div class="col-md-8">
                                                <div class="input-group mb-2" >
                                                    <div class="input-group-prepend">
                                                        <div class="input-group-text"><i class="icon icon-email float-left s-20 green-text " ></i></div>
                                                    </div>
                                                    <input type="email" required v-model="form.email" readonly class="form-control r-1 light s-12" placeholder="Email"> 
                                                </div>
                                                <div class="input-group mb-2" >
                                                    <div class="input-group-prepend">
                                                        <div class="input-group-text"><i class="icon icon-lock3 float-left s-20 green-text " ></i></div>
                                                    </div>
                                                    <input type="password" required v-model="form.old_password" class="form-control r-1 light s-12" placeholder="Old Password"> 
                                                </div>
                                            
                                                <span class="btn btn-success btn-sm" v-if="submitting && codeSubmitting">...</span>
                                                <button v-else type="submit" class="btn btn-success btn-sm btn-block">
                                                    <i class="icon-check-square-o mr-2"></i>Send Confirmation code
                                                </button>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>

                        <div class="col-md-6">
                            <div class="card">
                                <div class="card-header bg-white">
                                    <h6 class="green-text"><strong class="font-weight-bold">Change Password</strong></h6>
                                </div>
                                <div class="card-body">
                                    <div class="text-center mb-3">
                                        <small class="mt-2">To proceed with the change of your password,<br> enter confirmation code sent to your email.</small>
                                    </div>
                                    
                                    <form @submit.prevent="change()">
                                        <div class="form-row mb-3 d-flex justify-content-center">
                                            <div class="col-md-8">
                                                <div class="input-group mb-2" >
                                                    <div class="input-group-prepend">
                                                        <div class="input-group-text"><i class="icon icon-lock3 float-left s-20 green-text " ></i></div>
                                                    </div>
                                                    <input type="password" required v-model="changeForm.code" class="form-control r-1 light s-12" placeholder="Confirmation code"> 
                                                </div>
                                                
                                                <div class="input-group mb-2" >
                                                    <div class="input-group-prepend">
                                                        <div class="input-group-text"><i class="icon icon-lock3 float-left s-20 green-text " ></i></div>
                                                    </div>
                                                    <input type="password" required v-model="changeForm.password" class="form-control r-1 light s-12" placeholder="New Password"> 
                                                </div>

                                                <span class="btn btn-success btn-sm" v-if="submitting && changePassSumitting">...</span>
                                                <button v-else type="submit" class="btn btn-success btn-sm btn-block" value="Change">
                                                    <i class="icon-check-square-o mr-2"></i>Change Password
                                                </button>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    
</template>
<script>
import { mapActions, mapGetters, mapState } from 'vuex';

    export default{
        name:"admin-security",

        data(){
            return{
                form2Fa:{
                    enable_2fa:null
                },
                form:{
                    code:null,
                    email: null,
                    old_password:null,
                    user_type:'admin'
                },
                changeForm:{
                    code:null,
                    password:null,
                    email: null,
                    user_type:'admin'
                },

                codeSubmitting:false,
                changePassSumitting:false
            }
        },

        computed:{
            ...mapState({
                submitting:state=>state.submitting,
                loading:state=>state.loading
            }),

            ...mapGetters('authStore',['authUser'])
        },

        created(){
            if(this.authUser.id == undefined){
                this.getAdmin().then(res=>{
                    if(res.status == 200){
                        this.form.email = res.data.email
                        this.changeForm.email = res.data.email
                    }
                })
            }else{
                this.form.email = this.authUser.email
                this.changeForm.email = this.authUser.email
            }
            
        },

        methods:{
            ...mapActions('authStore',['getAdmin','toggleAdmin2fa','changePasswordLink','changePassword']),

            toggle2fa(){
                this.form2Fa.enable_2fa = ! this.authUser.enable_2fa
                this.toggleAdmin2fa(this.form2Fa).then(()=>this.getAdmin())
            },
            sendCode(){
                this.codeSubmitting = true
                this.changePasswordLink(this.form).then(()=>this.codeSubmitting = false)
            },

            change(){
                this.changePassSumitting = true
                this.changePassword(this.changeForm).then(()=>this.changePassSumitting=false)
            }
        }
    }
</script>