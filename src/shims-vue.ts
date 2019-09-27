import Vue from 'vue';

type CSSClass = (string | {
    [key: string]: string;
});

export class VueComponent<Props = {}> extends Vue {
  // @ts-ignore
  $props: Props & {
        key?: string;
        class?: CSSClass | CSSClass[];
    };
}
