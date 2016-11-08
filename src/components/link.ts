import * as b from 'bobril';

export default (data: IButtonData): b.IBobrilNode => {
    let link: b.IBobrilNode = {
        tag: 'a',
        children: data.label,
        attrs: {
            href: '#/'
        }
    };
    return data.link ? b.link(link, data.link) : link;
}

export interface IButtonData {
    label: string;
    link: string;
}