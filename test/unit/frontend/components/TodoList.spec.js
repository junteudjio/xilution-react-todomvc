import React from 'react';
import {shallow} from 'enzyme';
import Chance from 'chance';
import {ListGroup} from 'react-bootstrap';

import TodoList from '../../../../src/frontend/components/TodoList';
import Todo from '../../../../src/frontend/components/Todo';

const chance = new Chance();

describe('<TodoList />', () => {
    let wrapper,
        auth,
        deleteTodo,
        todos,
        toggleTodo;

    const renderComponent = () => {
        auth = {
            idToken: chance.string()
        };
        deleteTodo = jest.fn();
        todos = chance.n(() => ({
            completed: chance.bool(),
            id: chance.string(),
            text: chance.sentence()
        }), chance.integer({
            max: 100,
            min: 0
        }));
        toggleTodo = jest.fn();

        wrapper = shallow(
            <TodoList
                auth={auth}
                deleteTodo={deleteTodo}
                todos={todos}
                toggleTodo={toggleTodo}
            />);
    };

    describe('when the component renders', () => {
        beforeEach(() => {
            renderComponent();
        });

        test('it should render a div as the root element', () => {
            expect(wrapper.type()).toEqual(ListGroup);
        });

        test('it should render a list of todos', () => {
            for (let i = 0; i < wrapper.length; i++) {
                const child = wrapper.childAt(i);

                expect(child.type()).toEqual(Todo);
                expect(child.props().completed).toEqual(todos[i].completed);
                expect(child.props().id).toEqual(todos[i].id);
                expect(child.props().text).toEqual(todos[i].text);
            }
        });
    });
});