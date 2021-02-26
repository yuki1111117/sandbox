            template(v-if="$vuetify.theme.dark == true"): +cardContainerPug('cardContainer cardContainerDark')
            template(v-if="$vuetify.theme.dark == false"): +cardContainerPug('cardContainer cardContainerLight')
