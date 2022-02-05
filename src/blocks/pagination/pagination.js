import 'jquery';
import '../../libs/jquery.pajinatify/jquery.pajinatify';

$(() => {
  $('.pagination').pajinatify();
});

$('.pagination').pajinatify({
  onChange(currentPage) {
    console.log(currentPage);
  },
});
