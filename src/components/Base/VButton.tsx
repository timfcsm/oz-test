import {Component, Emit, Prop} from 'vue-property-decorator';

import { VueComponent } from '@/shims-vue';
import {VNode} from 'vue';

import styles from './VButton.scss?module';

interface IEvents {
    onClick?: (event: MouseEvent) => void;
}

interface IProps extends IEvents {
    type?: 'default'|'success';
    block?: boolean;
    disabled?: boolean;
}

@Component
export default class VButton extends VueComponent<IProps> {
    @Prop()
    private type!: 'default'|'success';

    @Prop()
    private block!: boolean;

    @Prop()
    private disabled!: boolean;

    @Emit('click')
    onClick(event: MouseEvent): MouseEvent {
        return event;
    }
    render(): VNode {
        const classList = [
            styles.VButton,
            {
                [styles.block]: this.block,
            },
        ];
        return <button onClick={this.onClick}
                       class={classList}
                       disabled={this.disabled}
        >{ this.$slots.default }</button>;
    }
}
