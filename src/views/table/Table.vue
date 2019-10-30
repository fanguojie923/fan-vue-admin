<template>
    <div>
        <!-- 列表页面 -->
        <div  class="panel-default">
            <!-- <div class="header">
              <div class="title">列表</div>
            </div>-->
            <!-- 搜索 -->
            <div class="search">
                <zzd-table-search
                        size="mini"
                        label-width="80px"
                        :search-data="searchData"
                        :search-form="searchForm"
                        @handleFilter="handleFilter"
                />
            </div>
            <!-- 表格 -->
            <div class="page-body">
                <div class="common-action-row clearfix">
                    <el-header style="float:right">
                        <el-row>
                            <router-link to="/device/device/add">
                                <el-button type="primary" size="medium">新增设备</el-button>
                            </router-link>
                        </el-row>
                    </el-header>
                </div>
                <zzd-table
                        v-loading="loading"
                        :table-column="tableColumn"
                        :table-data="tableData"
                        :operate="operate"
                        :type="type"
                        :select-field-unique="selectFieldUnique"
                        @handleStatus="handleStatus"
                        @handleEdit="handleEdit"
                        @handleDefault="handleDefault"
                        @row-click="rowClick"
                        @selection-change="handleSelectionChange"
                />
            </div>
            <!-- 分页 -->
            <div class="pagination">
                <el-pagination
                        v-if="refreshPagination"
                        :background="true"
                        :page-size="pageCount"
                        :page-sizes="[10, 20, 50, 100]"
                        :current-page="currentPage"
                        layout="total, sizes, prev, pager, next, jumper"
                        :total="total_nums"
                        @current-change="handleCurrentChange"
                        @size-change="handleSizeChange"
                />
            </div>
        </div>
        <!-- 编辑页面 -->
        <rule-add v-else :edit-book-i-d="editBookID" @editClose="editClose" />
    </div>
</template>

<script>
    import ZzdTable from '@/components/Base/Table'

    export default {
        name: 'Table',
        components: {
            ZzdTable,
        },
        data() {
            return {
                // --搜索 start--
                searchData: { deviceId: null, status: '' },
                searchForm: [
                    {
                        type: 'Input',
                        label: '设备编号',
                        prop: 'deviceId',
                        width: '180px',
                        placeholder: '请输入设备编号'
                    },
                    {
                        type: 'Select',
                        label: '设备状态',
                        prop: 'status',
                        width: '180px',
                        filterable: false,
                        options: []// TODO根据接口返回数据
                    }
                ],
                // --搜索 end--
                // --分页 start--
                refreshPagination: true, // 页数增加的时候，因为缓存的缘故，需要刷新Pagination组件
                total_nums: 0, // 分组内的用户总数
                currentPage: 1, // 默认获取第一页的数据
                pageCount: 10, // 每页10条数据
                // --分页 end--
                tableColumn: [
                    { prop: 'deviceId', label: '设备编号' },
                    { prop: 'name', label: '设备名称' },
                    { prop: 'typeName', label: '设备类型' },
                    { prop: 'zoneName', label: '设备区域' },
                    { prop: 'statusText', label: '状态' },
                    { prop: 'updateTimeText', label: '修改时间' }
                ], // 表头数据
                type: null, // 是否开启多选
                selectFieldUnique: null, // 默认唯一选中字段
                tableData: [
                    {
                    'deviceId':1,'name':'1','typeName':'1','zoneName':1,'statusText':'1','updateTimeText':'1'
                },{
                        'deviceId':2,'name':'2','typeName':'2','zoneName':2,'statusText':'2','updateTimeText':'2'
                    }], // 表格数据
                operate: [], // 表格按键操作区;
                highlightCurrentRow: false,
                editIndex: null, // 编辑的行ss
                dialogFormVisible: false, // 控制弹窗显示
                editBookID: 1
            }
        },
        watch: {

        },
        async created() {
            this.loading = true
            this.operate = {
                width: '300',
                data: [
                    { name: '编辑', func: 'handleEdit', type: 'primary' },
                    { name: '删除', func: 'handleStatus', type: 'danger', params: { status: 2 } },
                    {
                        name: "关闭",
                        func: "handleStatus",
                        type: "warning",
                        condition: 1, 
                        condationName: "status",
                        params: { status: 3 }
                    },
                    {
                        name: "启用",
                        func: "handleStatus",
                        type: "primary",
                        condition: 3,
                        condationName: "status",
                        params: { status: 1 }
                    },
                    { name: '默认设备',
                        type: 'info',
                        func: "",
                        condition: 1,
                        condationName: "isDefault",
                        params: { isDefault: 1 }},
                    {
                        name: "设为默认",
                        func: "handleDefault",
                        type: "success",
                        condition: 2,
                        condationName: "isDefault",
                        params: { isDefault: 2 }
                    }
                ]
            }
            this.loading = false
        },
        computed: {

        },
        mounted() {

        },
        methods: {
            async getDataList() {
                try {
                    const params = { curPage: this.currentPage, perPage: this.pageCount }
                    Object.assign(params, this.searchData)
                    const ret = await getDeviceList(params)
                    this.tableData = ret.data.list || []
                    this.total_nums = parseInt(ret.data.total)
                } catch (error) {
                    if (error.error_code === 10020) {
                        this.tableData = []
                    }
                }
            },
            handleEdit(val) {
                this.$router.push('/device/device/modify/' + val.row.deviceId)
            },
            // 删除，关闭，开启
            handleStatus(val) {
                console.log(val);
                let text = "";
                let operateStatus = val.params.status;
                if (operateStatus === 1) {
                    text = "开启";
                } else if (operateStatus === 2) {
                    text = "删除";
                } else if (operateStatus === 3) {
                    text = "关闭";
                }
                this.$confirm('确认' + text + '该设备?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(async() => {
                    await this.updateStatus(val.row.deviceId, operateStatus)
                    this.getDataList()
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消操作'
                    })
                })
            },
            async updateStatus(deviceId, status) {
                console.log('deviceid', deviceId)
                try {
                    const params = { deviceId: deviceId, status: status }
                    const ret = await updateDeviceStatus(params)
                    this.$message({
                        type: 'success',
                        message: '操作成功!'
                    })
                } catch (error) {
                    if (error.error_code === 10020) {
                    }
                }
            },
            // 设置默认
            async handleDefault(val) {
                this.$confirm('确定设置为默认设备吗', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(async() => {
                    const param = { deviceId: val.row.deviceId}
                    await updateDeviceDefault(param)
                    this.$message({
                        type: 'success',
                        message: '操作成功!',
                    })
                    this.getDataList()
                }).catch(() => {
                })
            },
            handleFilter(val) {
                this.getDataList()
            },
            // 切换table页
            async handleCurrentChange(val) {
                this.currentPage = val
                await this.getDataList()
            },
            // 切换每页条数
            async handleSizeChange(val) {
                this.pageCount = val
                await this.getDataList()
            },
            rowClick(row) {
                console.log('rowclick')
            },
            handleSelectionChange(val) {
                this.multipleSelection = val
            },
            editClose() {
                this.showEdit = false
            }
        }
    }
</script>
