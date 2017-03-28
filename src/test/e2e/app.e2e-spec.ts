import { GuiTemplatePage } from './app.po';

describe('gui-template App', () => {
  let page: GuiTemplatePage;

  beforeEach(() => {
    page = new GuiTemplatePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
