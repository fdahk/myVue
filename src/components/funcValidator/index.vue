<script setup lang="ts">
import {ref} from 'vue'
import { validate } from './validator'
const value = ref('')
const msg = ref<string[]>([])
const handleValidate = () => {
    
    const ctx = {
        value: value.value,
        type: false,
    }
    msg.value = []
    msg.value.push(validate(ctx) as string)
}
</script>

<template>
    <div class="validator-demo">
        <h2>函数式校验器演示</h2>
        
        <!--  -->
        <input type="text" v-model="value">
        
        <!-- 操作按钮 -->
        <div class="section">
            <h3>执行操作</h3>
            <button @click="handleValidate" class="btn-primary">
                执行校验
            </button>
        </div>
        
        <!-- 当前状态 -->
        <div class="section">
            <h3>当前状态</h3>
            <div class="status-info">
                <p v-for="item in msg" :key="item">{{ item }}</p>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
.validator-demo {
    max-width: 600px;
    margin: 0 auto;
    padding: 20px;
}

.section {
    margin-bottom: 30px;
    padding: 20px;
    border: 1px solid #ddd;
    border-radius: 8px;
    background: #f9f9f9;
}

.section h3 {
    margin-top: 0;
    color: #333;
}

.row-list {
    display: flex;
    flex-direction: column;
    gap: 10px;
}

.row-item {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 10px;
    background: white;
    border: 1px solid #ccc;
    border-radius: 4px;
    
    &.executed {
        background: #fff3cd;
        border-color: #ffeaa7;
    }
    
    &.unpaid {
        background: #f8d7da;
        border-color: #f5c6cb;
    }
}

.badge {
    padding: 2px 8px;
    border-radius: 12px;
    font-size: 12px;
    color: white;
    
    &.executed {
        background: #ffc107;
    }
    
    &.unpaid {
        background: #dc3545;
    }
}

.action-select {
    padding: 8px 12px;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 14px;
}

.btn-primary, .btn-secondary {
    padding: 10px 20px;
    margin-right: 10px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 14px;
}

.btn-primary {
    background: #007bff;
    color: white;
    
    &:hover {
        background: #0056b3;
    }
}

.btn-secondary {
    background: #6c757d;
    color: white;
    
    &:hover {
        background: #545b62;
    }
}

.status-info {
    background: white;
    padding: 15px;
    border-radius: 4px;
    border: 1px solid #ddd;
}

.status-info p {
    margin: 5px 0;
    color: #666;
}
</style>