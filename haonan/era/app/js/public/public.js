$(function () {
    var $doc = $(document)
    // 头部栏
    // body代理点击事件，点击其他地方隐藏头部下拉菜单
    $('body').on('click', function (e) {
        if (!$(e.target).parents().is('#headerCompany')) {
            $('#headerCompanyMenu').slideUp();
        }
    });
    // 登录后头部头像点击显示下拉菜单
    $('#headerCompanyLogo').click(function () {
        $('#headerCompanyMenu').slideToggle();
    });
    // 点击“退出登录”
    $('#logout').click(function () {
        $('#headerCompanyMenu').hide();
    });

    // 下拉框
    // body代理点击事件，点击其他地方隐藏选项下拉菜单
    $doc.on('click', function (e) {
        $('.select').has('.select-options:visible').each(function () {
            if (!this.contains(e.target)) {
                $(this).children('.select-options').slideUp()
            }
        })
    });
    // 点击显示下拉框
    $('.select').click(function (e) {
        // 把其他的先收起
        $('.select').not(this).find('.select-options').slideUp('fast');
        // 只展示当前的
        var $option = $(this).children('.select-options')
        if ($option.get(0).contains(e.target)) return
        $option.slideToggle('fast');
    });
    // 点击下拉框选项并收起下拉框
    $doc.on('click', '.select-option', function (e) {
        e.stopPropagation();
        var $this = $(this)
        var value = $this.attr('data-value')
        var $parent = $this.closest('.select-options')
        $parent.slideUp('fast');
        $this.closest('.select').trigger('selected', { label: $this.html(), value: value })

    })
    $('.select-options').on('click', function (e) {
    });
    // 已认证与未认证切换
    var isValide = true
    $('.is-verified').toggle(isValide)
    $('.is-unverified').toggle(!isValide)
});