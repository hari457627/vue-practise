<template>
    <div class="row">
        <div class="col-md-12 boxes">
            <ol>
                <li class="userBox" v-for="user in users" v-on:click="user.show=!user.show">
                    <p>{{user.name}}</p>
                    <p>{{user.age}}</p>
                    <p v-show="user.show">{{user.designation}}</p>
                </li>
            </ol>
        </div>
        <div class="col-md-8 sampleForm">
            <h4>sample form</h4>
                <input type="text" class="form-control" ref="name"/><br>
                <input type="text" class="form-control" ref="description"/><br>
                <input type="email" class="form-control" ref="email"/><br>
                <input type="text" class="form-control" ref="phone"/><br>
                <button type="submit" class="btn btn-primary" v-on:click="handleSubmit">submit</button>
        </div>
        <div class="col-md-8 sampleForm">
            <h4>Form Data</h4>
            <p>Name : {{userData.name}}</p>
            <p>Description : {{userData.desc}}</p>
            <p>Email : {{userData.email}}</p>
            <p>phone : {{userData.phone}}</p> 
        </div>
    </div>
</template>

<script>
export default {
    name : 'myContent',
    props:['users'],
    data: function() {
        return{
         userData : {}   
        }
    },
    methods :{
        handleSubmit : function(){
            var data = {};
            data.name = this.$refs.name.value;
            data.desc = this.$refs.description.value;
            data.email = this.$refs.email.value;
            data.phone = this.$refs.phone.value;
            console.log(data);
            this.userData = data;
        }
    }
}
</script>

<style scoped>
    .boxes {
        margin-top: 20px;
        margin-bottom: 20px;
    }
    .sampleForm{
        margin-left: 20px;
        margin-bottom: 20px;
    }
    .userBox{
        min-height: 150px;
        min-width: 230px;
        
        margin-right: 50px;
        border: 1px solid black;
        display: inline-block;
    }
</style>


