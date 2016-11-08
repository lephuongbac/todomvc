import * as b from 'bobril';

export default b.createComponent<ICheckboxData>({
    render(ctx: IButtonCtx, me: b.IBobrilNode) {
        me.tag = 'input';
        me.attrs = {
            type: 'checkbox',
            value: ctx.data.isChecked
        };
    },
    onClick(ctx: IButtonCtx): boolean {
        ctx.data.onClick && ctx.data.onClick();
        return true;
    }
});

export interface ICheckboxData {
    isChecked?: boolean;
    onClick: () => void;
}

interface IButtonCtx extends b.IBobrilCtx {
    data: ICheckboxData;
}