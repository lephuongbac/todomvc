import * as b from 'bobril';

export default b.createComponent<ILabelData>({
    render(ctx: ILabelCtx, me: b.IBobrilNode) {
        me.tag = 'label';
        me.children = ctx.data.value;
    }
});

export interface ILabelData {
    value: string;
}

interface ILabelCtx extends b.IBobrilCtx {
    data: ILabelData;
}