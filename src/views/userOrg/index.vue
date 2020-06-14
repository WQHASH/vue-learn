<!--
 * @Author: zd
 * @Date: 2020-06-10 14:31:16
 * @Description: 个人中心
 * @FilePath: \yswb\src\views\userManager\core\index.vue
--> 
<style lang="scss">
.head-portrait{
    width: 220px;
    padding: 10px;
    background-color: #f3f5f7;
    text-align: center;
    float: left;
}
.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
}
.avatar-uploader .el-upload:hover {
    border-color: #409EFF;
}
.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
}
.avatar {
    width: 178px;
    height: 178px;
    display: block;
}
.personal-details{
    float: right;
    width: calc(100% - 260px);
    min-height: 500px;
    padding: 10px;
}
.demo-ruleForm{
    width: 460px;
}
</style>

<template>
    <div class="user-org">
        <div class="personal-details">
            <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                <el-form-item label="组织" prop="name">
                    <el-input v-model="ruleForm.name" placeholder="请输入组织名称"></el-input>
                </el-form-item>
                <el-form-item label="描述" prop="description">
                    <el-input type="textarea" placeholder="请输入组织描述" v-model="ruleForm.description"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
                    <el-button @click="resetForm('ruleForm')">重置</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
export default {
	data() {
		return {
			ruleForm: {
				name: '',
				description: '',
			},
			rules: {
				name: [
					{ required: true, message: '请输入组织名称', trigger: 'blur' },
					{ min: 5, max: 30, message: '长度在 5 到 30 个字符', trigger: 'blur' }
				],
				description: [
					{ required: true, message: '请输入组织描述', trigger: 'blur' },
					{ min: 5, max: 100, message: '长度在 5 到 100 个字符', trigger: 'blur' }
				],
			}
		};
	},

	methods: {
		submitForm (e) {
	        var form = {};
	        form.name 			= this.name
	        form.Description 	= this.description
	        api_login(JSON.stringify(form)).then(function(res) {
	            console.log(res)
	        }).catch((error) => {

	        });
	    },
	}
}
</script>
