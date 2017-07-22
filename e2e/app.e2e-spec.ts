import { ProjetoXPage } from './app.po';

describe('projeto-x App', function() {
  let page: ProjetoXPage;

  beforeEach(() => {
    page = new ProjetoXPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
