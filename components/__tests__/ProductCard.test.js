import ProductCard from 'components/ProductCard';
import { shallow } from 'enzyme';

describe('ProductHeader Component', () => {
  it('has an h3 tag', () => {
    const component = shallow(<ProductCard />);
    var node = component.find('h3');
    expect(node.length).toEqual(1);
  });
});
