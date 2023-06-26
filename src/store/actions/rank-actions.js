import api from '../../api/ranks'
import toastr from 'toastr'
import { LogError } from '@/util/responseHandler'
import { notification } from '@/util/notification'

export default {

    async allRanks({commit}){
        try {
            commit('loading',null,{root:true})
            const res = await api.all()
            if(res && res.status==200){
                commit('ranks',res.data.data)
            }else{
                toastr.warning(res.data.message)
            }
            commit('loaded',null,{root:true})
        } catch (error) {
            LogError(commit,error,'loaded')
        }
    },

    async create({commit},data){
        try {
            commit('submitting',null,{root:true})
            const res = await api.create(data)
            if(res && res.status==200){
                toastr.success("Rank created successfully")
            }else{
                toastr.warning(res.data.message)
            }
        commit('submitted',null,{root:true})
        } catch (error) {
            LogError(commit,error,'submitted')
        }
    },

    async update({commit},{id,data}){
        var res;
        try {
            commit('submitting',null,{root:true})
            res = await api.update(id,data)
            if(res.status==200){
                notification.success("Rank updated successfully")
            }else{
                toastr.warning(res.data.message)
            }
            commit('submitted',null,{root:true})
            return res
        } catch (err) {
            LogError(commit,err,'submitted')
        }
    },

    async getCurrentRankBadge({commit}){
        var res;
        try {
            commit('loading',null,{root:true})
            res = await api.currentRankBadge()
            if(res.status==200){
                commit('currentRankBadge',res.data.data)
                //notification.success("Rank updated successfully")
            }else{
                toastr.warning(res.data.message)
            }
            commit('loaded',null,{root:true})
            return res
        } catch (err) {
            LogError(commit,err,'loaded')
        }
    },
}