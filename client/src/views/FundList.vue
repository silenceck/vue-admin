<template>
    <div class="fillContain">

        <div>
            <!-- <el-form :inline="true" ref="add_data">
                <el-form-item class="btnRight">
                     <el-button type="primary" size="small" icon="view" @click="handleAdd() ">添加</el-button>
                </el-form-item>
            </el-form> -->
            <el-button type="primary" size="small" icon="view" @click="handleAdd() ">添加</el-button>
        </div>
        <div class="table_container">
            <el-table
            v-if="tableData.length > 0"
            :data="tableData"
            max-height="450"
            border
            style="width: 100%">
            <el-table-column
                type="index"
                label="序号"
                align="center"
                width="70">
            </el-table-column>
            <el-table-column
                label="创建时间"
                align="center"
                width="250">
                <template slot-scope="scope">
                    <i class="el-icon-time"></i>
                    <span style="margin-left: 10px">{{ scope.row.date }}</span>
                </template>     
            </el-table-column>
            <el-table-column
                prop="type"
                label="收支类型"
                align="center"
                width="120">
            </el-table-column>
            <!-- <el-table-column
                prop="desc"
                    label="收支描述"
                    align="center"
                    width="160">
                </el-table-column> -->
                <el-table-column
                    prop="income"
                    label="收入"
                    align="center"
                    width="150">
                    <template slot-scope="scope">
                    <span style="color:#00d053">+ {{ scope.row.income }}</span>
                </template>
                </el-table-column>
                <el-table-column
                    prop="expend"
                    label="支出"
                    align="center"
                    width="170">
                    <template slot-scope="scope">
                    <span style="color:#f56767">- {{ scope.row.expend }}</span>
                </template>
                </el-table-column>
                <el-table-column
                    prop="cash"
                    label="现金"
                    align="center"
                    width="170">
                    <template slot-scope="scope">
                    <span style="color:#4db3ff">+ {{ scope.row.cash }}</span>
                </template>
                </el-table-column>
                <el-table-column
                    prop="remark"
                    label="备注"
                    align="center"
                    width="160">
                </el-table-column>
            <el-table-column prop="operation" align="center" label="操作" fixed="right" width="160">
            <template slot-scope="scope">
                <el-button
                type="warning"
                size="small"
                icon="edit"
                @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                <el-button
                size="small"
                type="danger"
                icon="delete"
                @click="handleDelete(scope.$index, scope.row)">删除</el-button>
            </template>
            </el-table-column>
            </el-table>
        </div>
        <Dialog :dialog='dialog'></Dialog>
    </div>
</template>

<script>
import Dialog from '../components/Dialog'
    export default {
        name: "fundList",
        data(){
            return {
                tableData: [

                ],
                dialog: {
                    show: false,
                }
            }
        },
        created(){
            this.getProfile();
        },
        methods:{
            getProfile(){
                this.$http.get('/api/profiles')
                .then( res => {
                    console.log(res.data)
                    this.tableData = res.data;
                })
                .catch( err => console.log(err) )
            },
            handleEdit(index, row) {
                console.log(index, row);
            },
            handleDelete(index, row) {
                console.log(index, row);
            },
            handleAdd(){
                this.dialog.show = true;
            }

        },
        components:{
            Dialog,
        }

    }
</script>
<style scoped>

.fillContainer {
  width: 100%;
  height: 100%;
  padding: 16px;
  box-sizing: border-box;
}
.btnRight {
  float: right;
}
.pagination {
  text-align: right;
  margin-top: 10px;
}
</style>