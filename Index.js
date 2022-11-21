new Vue({
    el: "#app",
    mounted() {
        axios({
            method: "get",
            url: "http://localhost:8080/employee/selectByPage?currentPage=" + this.currentPage + "&size=" + this.size
        }).then(resp => {
            // this.tableData = resp.data;
            this.tableData = resp.data.rows;
            this.totalCount = resp.data.totalCount;
        })
    },
    methods: {
        selectAll() {
            axios({
                method: "get",
                url: "http://localhost:8080/employee/selectByPage?currentPage=" + this.currentPage + "&size=" + this.size
            }).then((resp) => {
                // this.tableData = resp.data;
                this.tableData = resp.data.rows;
                this.totalCount = resp.data.totalCount;
            })
        },
        deleteByIds() {
            this.$confirm('此操作将删除该数据, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                for (let i = 0; i < this.multipleSelection.length; i++) {
                    this.selectedIds[i] = this.multipleSelection[i].empId;
                    // console.log(this.multipleSelection[i])
                    // console.log(this.selectedIds[i])
                }
                var innerThis = this;
                axios({
                    method: "post",
                    url: "http://localhost:8080/employee/deleteByIds",
                    data: innerThis.selectedIds
                }).then((resp) => {
                    if (resp.data == "success") {
                        this.selectAll();
                        this.$message({
                            message: "恭喜你，删除成功",
                            type: "success"
                        });
                    }
                })
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });
            });

        },
        tableRowClassName({row, rowIndex}) {
            if (rowIndex === 1) {
                return 'warning-row';
            } else if (rowIndex === 3) {
                return 'success-row';
            }
            return '';
        },
        // 复选框选中后执行的方法
        handleSelectionChange(val) {
            this.multipleSelection = val;
            console.log(this.multipleSelection)
        },
        // 查询方法
        onSubmit() {
            this.employee.empName = this.searching.name;
            this.employee.deptName = this.searching.dept;
            axios({
                method: "post",
                url: "http://localhost:8080/employee/selectByPageAndCondition?currentPage=" + this.currentPage + "&size=" + this.size,
                data: this.employee
            }).then((resp) => {
                // this.tableData = resp.data;
                this.tableData = resp.data.rows;
                this.totalCount = resp.data.totalCount;
            })
        },
        // 添加数据
        addEmployee() {
            //发送ajax请求
            axios({
                method: "post",
                url: "http://localhost:8080/employee/add",
                data: this.employee
            }).then((resp) => {
                if (resp.data == "success") {
                    this.dialogVisible = false;
                    this.selectAll();
                    this.$message({
                        message: "添加成功",
                        type: "success"
                    });
                }
            })
        },
        //修改数据
        updateEmployee() {
            //发送ajax请求
            axios({
                method: "post",
                url: "http://localhost:8080/employee/update",
                data: this.employee
            }).then((resp) => {
                if (resp.data == "success") {
                    this.dialogVisibleUpdate = false;
                    this.selectAll();
                    this.$message({
                        message: "修改成功",
                        type: "success"
                    });
                }
            })
        },
        //分页
        handleSizeChange(val) {
            // console.log(`每页 ${val} 条`);
            this.size = val;
            this.selectAll();
        },
        handleCurrentChange(val) {
            // console.log(`当前页: ${val}`);
            this.currentPage = val;
            this.selectAll();
        },

        handleEdit(index, row) {
            console.log(index, row);
            this.employee.empId = row.empId;
            this.employee = row;
        },
        handleDelete(index, row) {
            console.log(index, row);
            this.employee.empId = row.empId;
            //发送ajax请求
            axios({
                method: "post",
                url: "http://localhost:8080/employee/delete",
                data: this.employee.empId
            }).then((resp) => {
                if (resp.data == "success") {
                    this.dialogVisibleUpdate = false;
                    this.selectAll();
                    this.$message({
                        message: "删除成功",
                        type: "success"
                    });
                }
            })
        },
        handleOpen(key, keyPath) {
            console.log(key, keyPath);
        },
        handleClose(key, keyPath) {
            console.log(key, keyPath);
        }
    },
    data() {
        return {
            //总共数据行
            totalCount: 100,
            //页面显示数量
            size: 5,
            //被选中的ids
            selectedIds: [],
            // 当前页码
            currentPage: 1,
            // 添加数据对话框是否展示的标记
            dialogVisible: false,
            // 修改数据对话框是否展示的标记
            dialogVisibleUpdate: false,
            //搜索模型数据
            searching: {
                name: "",
                dept: "",
            },
            // 员工模型数据
            employee: {
                empId: "",
                empName: "",
                job: "",
                deptName: "",
                educationBackground: "",
                type: "",
                date: "",
            },
            // 复选框选中数据集合
            multipleSelection: [],
            // 表格数据
            tableData: [{
                empName: "张三",
                job: "高级经理",
                deptName: "金融",
                educationBackground: "硕士",
                type: "正式员工",
                date: "2022/6"
            }, {
                empName: "张三",
                job: "高级经理",
                deptName: "金融",
                educationBackground: "硕士",
                type: "正式员工",
                date: "2022/6"
            }, {
                empName: "张三",
                job: "高级经理",
                deptName: "金融",
                educationBackground: "硕士",
                type: "正式员工",
                date: "2022/6"
            }, {
                empName: "张三",
                job: "高级经理",
                deptName: "金融",
                educationBackground: "硕士",
                type: "正式员工",
                date: "2022/6"
            }]
        }
    }
})

