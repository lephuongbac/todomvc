import * as b from 'bobril';

export default b.createComponent<IData>({
    render(ctx: ICtx, me: b.IBobrilNode) {
        me.tag = 'input';
        me.attrs = {
            type: 'checkbox',
            checked: ctx.data.isChecked
        };
        b.style(me, checkboxStyle);
    },
    onChange(ctx: ICtx, value: boolean) {
        ctx.data.onChange && ctx.data.onChange(value);
        return true;
    }
});

export interface IData {
    onChange?: (value: boolean) => void;
    isChecked?: boolean;
}

interface ICtx extends b.IBobrilCtx {
    data: IData;
}

const checkboxStyle = b.styleDef('toggle-all');