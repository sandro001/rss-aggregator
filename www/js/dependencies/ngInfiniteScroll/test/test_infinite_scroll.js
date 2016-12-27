var should,
  slice = [].slice;

should = chai.should();

describe('Infinite Scroll', function() {
  var $compile, $document, $rootScope, $timeout, docWindow, fakeWindow, origJq, ref;
  ref = [void 0], $rootScope = ref[0], $compile = ref[1], docWindow = ref[2], $document = ref[3], $timeout = ref[4], fakeWindow = ref[5], origJq = ref[6];
  beforeEach(function() {
    return module('infinite-scroll');
  });
  beforeEach(function() {
    return inject(function(_$rootScope_, _$compile_, _$window_, _$document_, _$timeout_) {
      var $window;
      $rootScope = _$rootScope_;
      $compile = _$compile_;
      $window = _$window_;
      $document = _$document_;
      $timeout = _$timeout_;
      fakeWindow = angular.element($window);
      origJq = angular.element;
      return angular.element = function() {
        var args, first;
        first = arguments[0], args = 2 <= arguments.length ? slice.call(arguments, 1) : [];
        if (first === $window) {
          return fakeWindow;
        } else {
          return origJq.apply(null, [first].concat(slice.call(args)));
        }
      };
    });
  });
  afterEach(function() {
    return angular.element = origJq;
  });
  it('triggers on scrolling', function() {
    var el, scope, scroller;
    scroller = "<div infinite-scroll='scroll()' style='height: 1000px'\n  infinite-scroll-immediate-check='false'></div>";
    el = angular.element(scroller);
    $document.append(el);
    sinon.stub(fakeWindow, 'height').returns(1000);
    scope = $rootScope.$new(true);
    scope.scroll = sinon.spy();
    $compile(el)(scope);
    $timeout.flush();
    fakeWindow.scroll();
    scope.scroll.should.have.been.calledOnce;
    el.remove();
    return scope.$destroy();
  });
  it('triggers immediately by default', function() {
    var el, scope, scroller;
    scroller = "<div infinite-scroll='scroll()' style='height: 1000px'></div>";
    el = angular.element(scroller);
    $document.append(el);
    sinon.stub(fakeWindow, 'height').returns(1000);
    scope = $rootScope.$new(true);
    scope.scroll = sinon.spy();
    $compile(el)(scope);
    $timeout.flush();
    scope.scroll.should.have.been.calledOnce;
    el.remove();
    return scope.$destroy();
  });
  it('does not trigger immediately when infinite-scroll-immediate-check is false', function() {
    var el, scope, scroller;
    scroller = "<div infinite-scroll='scroll()' infinite-scroll-distance='1'\n  infinite-scroll-immediate-check='false' style='height: 500px;'></div>";
    el = angular.element(scroller);
    $document.append(el);
    sinon.stub(fakeWindow, 'height').returns(1000);
    scope = $rootScope.$new(true);
    scope.scroll = sinon.spy();
    $compile(el)(scope);
    $timeout.flush();
    scope.scroll.should.not.have.been.called;
    fakeWindow.scroll();
    scope.scroll.should.have.been.calledOnce;
    el.remove();
    return scope.$destroy();
  });
  it('does not trigger when disabled', function() {
    var el, scope, scroller;
    scroller = "<div infinite-scroll='scroll()' infinite-scroll-distance='1'\n  infinite-scroll-disabled='busy' style='height: 500px;'></div>";
    el = angular.element(scroller);
    $document.append(el);
    sinon.stub(fakeWindow, 'height').returns(1000);
    scope = $rootScope.$new(true);
    scope.scroll = sinon.spy();
    scope.busy = true;
    $compile(el)(scope);
    scope.$digest();
    fakeWindow.scroll();
    scope.scroll.should.not.have.been.called;
    el.remove();
    return scope.$destroy();
  });
  it('re-triggers after being re-enabled', function() {
    var el, scope, scroller;
    scroller = "<div infinite-scroll='scroll()' infinite-scroll-distance='1'\n  infinite-scroll-disabled='busy' style='height: 500px;'></div>";
    el = angular.element(scroller);
    $document.append(el);
    sinon.stub(fakeWindow, 'height').returns(1000);
    scope = $rootScope.$new(true);
    scope.scroll = sinon.spy();
    scope.busy = true;
    $compile(el)(scope);
    scope.$digest();
    fakeWindow.scroll();
    scope.scroll.should.not.have.been.called;
    scope.busy = false;
    scope.$digest();
    scope.scroll.should.have.been.calledOnce;
    el.remove();
    return scope.$destroy();
  });
  it('only triggers when the page has been sufficiently scrolled down', function() {
    var el, scope, scroller;
    scroller = "<div infinite-scroll='scroll()'\n  infinite-scroll-distance='1' style='height: 10000px'></div>";
    el = angular.element(scroller);
    $document.append(el);
    sinon.stub(fakeWindow, 'height').returns(1000);
    sinon.stub(fakeWindow, 'scrollTop').returns(7999);
    scope = $rootScope.$new(true);
    scope.scroll = sinon.spy();
    $compile(el)(scope);
    scope.$digest();
    fakeWindow.scroll();
    scope.scroll.should.not.have.been.called;
    fakeWindow.scrollTop.returns(8000);
    fakeWindow.scroll();
    scope.scroll.should.have.been.calledOnce;
    el.remove();
    return scope.$destroy();
  });
  return it('respects the infinite-scroll-distance attribute', function() {
    var el, scope, scroller;
    scroller = "<div infinite-scroll='scroll()' infinite-scroll-distance='5' style='height: 10000px;'></div>";
    el = angular.element(scroller);
    $document.append(el);
    sinon.stub(fakeWindow, 'height').returns(1000);
    sinon.stub(fakeWindow, 'scrollTop').returns(3999);
    scope = $rootScope.$new(true);
    scope.scroll = sinon.spy();
    $compile(el)(scope);
    scope.$digest();
    fakeWindow.scroll();
    scope.scroll.should.not.have.been.called;
    fakeWindow.scrollTop.returns(4000);
    fakeWindow.scroll();
    scope.scroll.should.have.been.calledOnce;
    el.remove();
    return scope.$destroy();
  });
});

//# sourceMappingURL=test_infinite_scroll.js.map
