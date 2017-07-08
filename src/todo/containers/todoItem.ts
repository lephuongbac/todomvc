import * as b from 'bobril';
import * as gui from './../../components/gui';

export interface IData {
    value?: string;
    isChecked: boolean;
    onCheck: () => void;
    onDelete: () => void;
}

interface ICtx extends b.IBobrilCtx {
    data: IData;
}

export default b.createComponent<IData>({
    render(ctx: ICtx, me: b.IBobrilNode) {
        me.tag = 'li';
        me.children = [
            createToggle(ctx),
            gui.label({
                value: ctx.data.value
            }),
            createDeleteButton(ctx)
        ];
        if (ctx.data.isChecked) {
            b.style(me, completedStyle);
        }
    }
});

function createToggle(ctx: ICtx): b.IBobrilNode {
    return b.style(
        gui.checkbox({
            isChecked: ctx.data.isChecked,
            onChange: () => {
                ctx.data.onCheck && ctx.data.onCheck();
            }
        }),
        toggleStyle
    );
}

function createDeleteButton(ctx: ICtx): b.IBobrilNode {
    return b.style(
        gui.button({
            onClick: () => {
                ctx.data.onDelete && ctx.data.onDelete();
                return true;
            }
        }),
        destroyStyle
    );
}

const toggleStyle = b.styleDef('toggle');
const destroyStyle = b.styleDef('destroy');
const completedStyle = b.styleDef('completed');
