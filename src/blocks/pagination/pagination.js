import 'jquery';
import '../../libs/jquery.pajinatify/jquery.pajinatify';

$(() => {
  $('.pagination').pajinatify();
});

const paginationAction = (action) => {
  $('.pagination').pajinatify({
    onChange(currentPage) {
      action(currentPage);
    },
  });
};

export default paginationAction;
