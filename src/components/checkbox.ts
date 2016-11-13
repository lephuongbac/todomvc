import * as b from 'bobril';

export default b.createComponent<ICheckboxData>({
    render(ctx: ICheckboxCtx, me: b.IBobrilNode) {
        me.tag = 'input';
        me.attrs = {
            type: 'checkbox',
            value: ctx.data.isChecked
        };
    },
    onChange(ctx: ICheckboxCtx): boolean {
        ctx.data.onChange && ctx.data.onChange();
        return true;
    }
});

export interface ICheckboxData {
    isChecked?: boolean;
    onChange: () => void;
}

interface ICheckboxCtx extends b.IBobrilCtx {
    data: ICheckboxData;
}