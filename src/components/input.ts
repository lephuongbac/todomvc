import * as b from 'bobril';

const enterKey = 13;

export default b.createComponent<IData>({
    render(ctx: ICtx, me: b.IBobrilNode) {
        me.tag = 'input';
        me.attrs = {
            type: 'text',
            value: ctx.data.value
        }
        if (ctx.data.placeholder) {
            me.attrs['placeholder'] = ctx.data.placeholder;
        }
        b.style(me, inputStyle);
    },
    onChange(ctx: ICtx, value: string) {
        ctx.data.onChange && ctx.data.onChange(value);
    },
    onKeyPress(ctx: ICtx, event: b.IKeyPressEvent) {
        if (event.charCode === enterKey) {
            ctx.data.onEnter && ctx.data.onEnter();
        }
        return false;
    }
});

export interface IData {
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    onEnter?: () => void;
}

interface ICtx extends b.IBobrilCtx {
    data: IData;
}


const inputStyle = b.styleDef('new-todo');