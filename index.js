// 长按事件 支持修饰符自定义长按时长    支持传参
export default {
    install: (Vue) => {
        Vue.directive('longpress', {
            bind: function(el, binding, vNode) {
                const ctx = vNode.context;
                // 先定义运行函数
                let handle = null;
                // 判断绑定的是否是函数
                if (typeof binding.value === 'function') {
                    // <el-button type="primary" size="mini" v-longpress.3000="longpresshandle">长按</el-button>
                    handle = (e) => {
                        binding.value(e);
                    };
                } else {
                    // 自定义指令传值的方式
                    // <el-button type="primary" size="mini" v-longpress:longpresshandle.2000="params">长按传参</el-button>
                    if (binding.arg) {
                        handle = (e) => {
                            ctx[binding.arg](binding.value, e);
                        };
                    } else {
                        throw new Error('指令使用方式不对');
                    }
                }
                let timeOut = 1000; // 长按触发时长 默认1000
                // 获取修饰符（用于确定长按的触发时长）
                const modifiers = binding.modifiers;
                const modifiersArray = Object.keys(modifiers);
                modifiersArray.forEach( item => {
                    if (item && parseFloat(item).toString() !== 'NaN') {
                        timeOut = parseFloat(item);
                    }
                });
                // 定义长按事件
                let pressTimer = null;
                // 定义函数处理程序
                // 创建计时器（ timeOut秒后执行函数 ）
                let start = (e) => {
                    if (e.type === 'click' && e.button !== 0) {
                        return;
                    }
                    if (pressTimer === null) {
                        pressTimer = setTimeout(() => {
                            // 执行函数
                            handle(el);
                        }, timeOut);
                    }
                };
                // 取消计时器
                let cancel = (e) => {
                    // 检查计时器是否有值
                    if ( pressTimer !== null ) {
                        clearTimeout(pressTimer);
                        pressTimer = null;
                    }
                };
                // 添加事件监听器
                el.addEventListener("mousedown", start);
                el.addEventListener("touchstart", start);
                // 取消计时器
                el.addEventListener("click", cancel);
                el.addEventListener("mouseout", cancel);
                el.addEventListener("touchend", cancel);
                el.addEventListener("touchcancel", cancel);
            }
        });
    }
};

