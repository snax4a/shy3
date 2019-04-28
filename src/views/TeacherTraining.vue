<template lang='pug'>
.container.teacher-training
  .row
    .col-md-6
      img.img-fluid.border(src='@/assets/images/teacher-training.jpg', alt='Teacher training')
    .col-md-6
      h1 Schoolhouse Yoga Teacher Training
      p
        | Schoolhouse Yoga is excited to offer this comprehensive teacher training and yoga intensive led by the top yoga instructors in the city of Pittsburgh. The program will run February through October and will cover content in the following areas: the history of Yoga, Yogic philosophy, Yoga Sutras, anatomy and physiology, adjustments and teaching techniques, meditation, Ayurveda, Ashtanga Yoga, Kundalini Yoga, Yin Yoga, Restorative Yoga, and more! Schoolhouse Yoga&apos;s curriculum has been certified by Yoga Alliance and has been given a five-star rating by past participants. 
      h3 Benefits of Our Program
      ul
        li
          | Taught by top yoga instructors in the city of Pittsburgh, each teaching in their area of expertise
        li
          | Participants in our program will receive a discount on weekly yoga classes (only $5/class)
        li
          | Program will cover training in Hatha Yoga, Kundalini Yoga, Ashtanga Yoga, Flow Yoga, Yin Yoga, Restorative Yoga, Iyengar Yoga, Therapeutic Yoga, Ayurveda, Meditation, Anatomy and Physiology, Philosophy, the Yoga Sutras and the history of Yoga, adjustments, teaching techniques and much more
      h3 Program Requirements
      ul
        li Attend teacher training sessions (or make arrangements to make-up missed hours)
        li Complete homework assignments
        li Complete 10 hours of volunteer teaching
        li Attend 4 workshops
        li
          | Attend at least one yoga class per week (classes at SHY are only $5/class for teacher trainees!)
        li Maintain a personal journal
        li Read books on required reading list
        li Complete take-home final exam
      h3 Required Reading List
      ul
        li Susi Hately&apos;s Anatomy and Asana: Preventing Yoga Injuries
        li Light on Yoga by BKS Iyengar
        li Light on the Yoga Sutras by BKS Iyengar
        li Donna Farhi: The Breathing Book
        li Blandine Calais-Germain: Anatomy of Movement (newest edition)
        li Anatomy Trains by Tom Myers
      p
        | Interested in joining next year&apos;s program? Please contact us at 
        a(href='mailto:info@schoolhouseyoga.com') info@schoolhouseyoga.com
        | .
      p
        b Terms &amp; conditions
        br
        | The deadline to withdraw from the program is February 10th. A non-refundable fee
        | of $100 will apply. No refunds will be granted after February 10th.
      b-form(@submit.prevent='addToCart')
        b-form-group(label='Payment Options')
          b-form-radio(v-model='form.productId', name='paymentTerms', value='98') Payment in full ($2,750) 
          b-form-radio(v-model='form.productId', name='paymentTerms', value='99') 9 x Monthly payments ($334/each)
        b-form-checkbox(v-model='form.agreed', aria-describedby='password-help-block') I agree to these terms and conditions.
        b-form-text.has-error(id='agreed-help-block', v-if='!form.agreed') You must select this checkbox to proceed.            
        br
        b-button.btn-warning.submit(type='submit', v-if='!applePaySupported', :disabled='!form.agreed') Pay Now
        b-button.apple-pay-button(v-if='applePaySupported', :disabled='!form.agreed')
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class TeacherTraining extends Vue {
  private applePaySupported: boolean = false;
  private form: any = {
    agreed: false,
    productId: 98,
  };

  private addToCart(evt: any) {
    alert(JSON.stringify(this.form));
  }
}
</script>

<style scoped lang="scss">
  .img-fluid .border {
    margin-top: 20px!important;
  }

  .submit {
    width:100px;
  }
</style>