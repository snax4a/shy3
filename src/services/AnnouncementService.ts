import Api from '@/services/Api';

export default {
  announcementsGet() {
      return Api().get('/api/announcement');
  }
};
