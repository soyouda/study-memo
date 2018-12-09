<template>
    <div>
        <div class="header">스터디 관리</div>
        <div class="container">
            <div class="list" v-if="mode === 'list'">
                <ul>
                    <li v-for="m in memos">
                        <div>
                            <h3>{{ m.title }}</h3>
                            <p>{{ m.content }}</p>
                        </div>
                        <button type="button" class="btn edit-btn" v-on:click="open(m.id)">수정</button>
                    </li>
                </ul>
            </div>
            <div class="write" v-else>
                <input type="text" v-model="memo.title">
                <textarea v-model="memo.content" name="" id="" cols="30" rows="10"></textarea>
                <button type="button" class="btn save-btn" v-on:click="save()">저장</button>
                <button type="button" class="btn cancel-btn" v-on:click="cancel()" v-if="mode === 'write'">취소</button>
                <button type="button" class="btn remove-btn" v-on:click="remove()" v-if="mode === 'edit'">삭제</button>
            </div>
            <button type="button" class="add-btn" v-on:click="write()" v-if="mode === 'list'">추가</button>
        </div>
    </div>
</template>

<script>
    export default {
        name: "StudyAdmin",
        data: function () {
            return {
                mode: 'list',
                memo: {
                    id: null,
                    title: null,
                    content: null,
                    regDate: null
                },
                memos:[
                    {
                        id: 1,
                        title: 'title',
                        content: 'memo #1',
                        regDate: new Date()
                    },
                ]
            }
        },
        created: function () {
            var memos = localStorage.getItem('memos');

            if(memos) {
                this.memos = JSON.parse(memos);
            }
        },
        methods: {
            renew: function (val) {
                return JSON.parse(JSON.stringify(val));
            },
            open: function (id) {
                for(var i in this.memos) {
                    if(this.memos[i].id === id) {
                        this.memo = this.renew(this.memos[i]);
                        break
                    }
                }

                this.mode = 'edit';
            },
            write: function () {
                this.mode = 'write';
                this.memo = {
                    id: null,
                    content: null,
                    regDate: null
                };
            },
            save: function () {
                var id = this.memos.length + 1;

                if(this.memo.content === null) {
                    confirm('내용을 입력하세요.');
                    return;
                }

                if(this.mode === 'write') {
                    this.memos.push({
                        id: id,
                        title: this.memo.title,
                        content: this.memo.content,
                        regDate: new Date()
                    });
                }
                else if (this.mode === 'edit'){
                    for(var i in this.memos) {
                        if(this.memos[i].id === this.memo.id) {
                            this.memos[i] = this.renew(this.memo);
                            break;
                        }
                    }
                }

                this.mode = 'list';
                localStorage.setItem('memos', JSON.stringify(this.memos))
            },
            remove: function () {
                if(confirm('삭제 하시겠습니까?')){
                    for(var i in this.memos) {
                        if(this.memos[i].id === this.memo.id) {
                            this.memos.splice(i, 1);
                            break;
                        }
                    }
                    localStorage.setItem('memos', JSON.stringify(this.memos));
                    this.mode = 'list';
                }
            },
            cancel: function () {
                this.mode = 'list';
            },
        }
    }
</script>

<style scoped>

</style>