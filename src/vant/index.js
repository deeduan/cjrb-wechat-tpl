import Vue from 'vue';

// 导入Vant组件
import {Toast, Dialog, Lazyload, Button, CountDown, Search, Grid, GridItem} from 'vant';

Vue.use(Toast).use(Dialog).use(Lazyload).use(Button).use(CountDown).use(Search).use(Grid).use(GridItem);


import { Image as VanImage } from 'vant';

Vue.use(VanImage);


import { Tabbar, TabbarItem, Field } from 'vant';

Vue.use(Tabbar).use(Field);
Vue.use(TabbarItem);

import { RadioGroup, Radio } from 'vant';

Vue.use(Radio);
Vue.use(RadioGroup);

import { Cell, CellGroup, Icon} from "vant";
Vue.use(Cell);
Vue.use(CellGroup).use(Icon);

import { Collapse, CollapseItem, Popup } from 'vant';

Vue.use(Collapse).use(Popup);
Vue.use(CollapseItem);
