// 定义 validator 结构
type Validator = {
    check: (ctx: any) => boolean; // 不满足条件返回 true
    message: string;              // 不通过时的提示信息
};

// 校验器数组
const validators: Validator[] = [
    {
        check: (ctx) => ctx.value.length === 0,
        message: '请输入数据！',
    },
    {
        check: (ctx) => ctx.value.length > 10,
        message: '数据长度不能超过10！',
    },
    {
        check: (ctx) => !ctx.type,
        message: '权限不符合！',
    }
];

// 校验执行逻辑
export function validate(ctx: any): string | null {
    for (const v of validators) {
        if (v.check(ctx)) return v.message;
    }
    return "校验通过！";
}

