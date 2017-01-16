<template>
    <div class="date-range">
        <!-- <input v-el:start id="start" type="text" v-model="start" /> -->
        <input id="datepicker-from" type="text" v-datepicker="from" />
        -
        <input id="datepicker-to" type="text" v-datepicker="to" />
    </div>
</template>

<script>
import $ from 'jquery';
import 'jquery-ui/ui/widgets/datepicker';

export default {
    data () {
        return {
            from: null,
            to: null
        };
    },
    ready () {
        // const { $els } = this;
        // const $start = $($els.start);
        // const $end = $($els.end);
        //
        // $start.datepicker();
        // $end.datepicker({
        //     classes: 'xxx',
        //     // minDate: -20,
        //     maxDate: 0
        // });
    },

    directives: {
        datepicker: {
            bind () {
                const vm = this.vm;
                const key = this.expression;
                $(this.el).datepicker({
                    // minDate: 1,
                    maxDate: 0,
                    // dateFormat: 'yy-mm-dd',
                    onSelect (date) {
                        // 设置截至日期的限制
                        if (key === 'from') {
                            $('#datepicker-to').datepicker('option', 'minDate', date);
                            vm.$set('to', date);
                        }
                        vm.$set(key, date);
                    }
                });
            },
            update (val) {
                $(this.el).datepicker('setDate', val);
            }
        }
    }
};
</script>

<style>
.ui-widget.ui-widget-content {
    border: 1px solid #c5c5c5;
    display: none;
}
.ui-datepicker {
    /*background-color: #eee;*/
}

/* Header */
.ui-datepicker .ui-datepicker-header {
    position: relative;
}

/* 上一页/下一页 */
.ui-datepicker .ui-datepicker-prev,
.ui-datepicker .ui-datepicker-next {
    position: absolute;
    top: 2px;
    background-color: #eee;
}
.ui-datepicker .ui-datepicker-prev .ui-icon,
.ui-datepicker .ui-datepicker-next .ui-icon {
    /*text-indent: -99999px;
    overflow: hidden;*/
    width: 20px;
    height: 20px;
    display: inline-block;
}

.ui-datepicker .ui-datepicker-prev {
    left: 2px;
}

.ui-datepicker .ui-datepicker-next {
    right: 2px;
}

/*Title*/
.ui-datepicker .ui-datepicker-title {
    text-align: center;
    margin: 0 30px;
    line-height: 1.8em;
}


/*table*/
.ui-datepicker table {
    width: 100%;
    font-size: .9em;
    border-collapse: collapse;
    margin: 0 0 .4em;
}

.ui-datepicker th {
    padding: .7em .3em;
    text-align: center;
    font-weight: bold;
    border: 0;
}

.ui-datepicker td {
    border: 0;
    padding: 1px;
}
.ui-datepicker td a,
.ui-datepicker td span {
    display: block;
    padding: .2em;
    text-align: right;
    text-decoration: none;
}

/*.ui-datepicker td a {
border: 1px solid #333;
}

.ui-datepicker td span {
border: 1px solid #eee;
}*/

.ui-state-default,
.ui-widget-content .ui-state-default,
.ui-widget-header .ui-state-default,
.ui-button,
.ui-button.ui-state-disabled:hover,
.ui-button.ui-state-disabled:active {
    border: 1px solid #c5c5c5;
    background: #f6f6f6;
    font-weight: normal;
    color: #454545;
}

.ui-state-disabled {
    cursor: default !important;
    pointer-events: none;
}

.ui-state-disabled .ui-state-default {
    border-color: transparent;
}

.ui-state-disabled,
.ui-widget-content .ui-state-disabled,
.ui-widget-header .ui-state-disabled {
    opacity: .35;
    background-image: none;
}

.ui-state-highlight,
.ui-widget-content .ui-state-highlight,
.ui-widget-header .ui-state-highlight {
	border: 1px solid #dad55e;
	background: #fffa90;
	color: #777620;
}
.ui-state-checked {
	border: 1px solid #dad55e;
	background: #fffa90;
}
.ui-state-highlight a,
.ui-widget-content .ui-state-highlight a,
.ui-widget-header .ui-state-highlight a {
	color: #777620;
}
</style>
