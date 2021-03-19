import SearchCard from './SearchCard.vue'

export default {
  title: 'Example/SearchCard',
  component: SearchCard,
  argTypes: {
    backgroundColor: { control: 'color' },
    size: {
      control: { type: 'select', options: ['small', 'medium', 'large'] },
    },
  },
}

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { SearchCard },
  template: '<SearchCard @onClick="onClick" v-bind="$props" />',
})

export const Primar = Template.bind({})
Primar.args = {
  primary: true,
  label: 'Button',
}
