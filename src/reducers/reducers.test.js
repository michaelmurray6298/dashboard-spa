import { Reducer } from 'redux-testkit';
import { transit as transitReducer } from '@databraid/transit-widget/lib/reducers';
import { github as githubReducer } from '@databraid/github-widget/lib/reducers';
import { storeReducer as slackReducer } from '@databraid/slack-widget/lib/Reducers';
import { widgets as rootReducer, collapseWidgetSidebars } from './index';
import {
  TRANSIT_WIDGET_ID,
  SLACK_WIDGET_ID,
  GITHUB_WIDGET_ID,
} from '../constants';

const initialState = {
  ids: [],
  byId: {},
  showSidebar: true,
  showAddWidgetModal: false,
  metadata: {},
  grid: {
    nextId: 1,
    layout: [],
    breakpoints: { lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 },
    cols: { lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 },
  },
};

const stateWithTransit = {
  byId: {},
  showSidebar: true,
  ids: [TRANSIT_WIDGET_ID],
  showAddWidgetModal: false,
  grid: {
    nextId: 1,
    layout: [
      { i: TRANSIT_WIDGET_ID, x: 0, y: 0, w: 6, h: 8, static: false },
    ],
    breakpoints: { lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 },
    cols: { lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 },
  },
  metadata: {
    transit: {
      type: 'transit',
      standardWidth: 6,
      standardHeight: 8,
      minWidth: 4,
      minHeight: 4,
      showSidebar: false,
    },
  },
};

const stateWithGithub = {
  byId: {},
  showSidebar: true,
  ids: [GITHUB_WIDGET_ID],
  showAddWidgetModal: false,
  grid: {
    nextId: 1,
    layout: [
      { i: GITHUB_WIDGET_ID, x: 6, y: 0, w: 6, h: 8, static: false },
    ],
    breakpoints: { lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 },
    cols: { lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 },
  },
  metadata: {
    github: {
      type: 'github',
      standardWidth: 6,
      standardHeight: 8,
      minWidth: 4,
      minHeight: 4,
      showSidebar: false,
    },
  },
};

const stateWithSlack = {
  byId: {},
  showSidebar: true,
  ids: [SLACK_WIDGET_ID],
  showAddWidgetModal: false,
  grid: {
    nextId: 1,
    layout: [
      { i: SLACK_WIDGET_ID, x: 0, y: 8, w: 6, h: 6, static: false },
    ],
    breakpoints: { lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 },
    cols: { lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 },
  },
  metadata: {
    slack: {
      type: 'slack',
      standardWidth: 6,
      standardHeight: 6,
      minWidth: 4,
      minHeight: 4,
      showSidebar: false,
    },
  },
};

describe('rootReducer', () => {
  it('should have initial state', () => {
    expect(rootReducer(initialState, {}))
      .toEqual({
        ...initialState,
        byId: {
          [TRANSIT_WIDGET_ID]: transitReducer(undefined, {}),
          [GITHUB_WIDGET_ID]: githubReducer(undefined, {}),
          [SLACK_WIDGET_ID]: slackReducer(undefined, {}),
        },
      });
  });

  it('should not affect state', () => {
    Reducer(rootReducer)
      .withState(initialState)
      .expect({ type: 'NOT_EXISTING' })
      .toReturnState({
        ...initialState,
        byId: {
          [TRANSIT_WIDGET_ID]: transitReducer(undefined, {}),
          [GITHUB_WIDGET_ID]: githubReducer(undefined, {}),
          [SLACK_WIDGET_ID]: slackReducer(undefined, {}),
        },
      });
  });

  it('should add the transit widget to the dashboard', () => {
    const action = { type: 'ADD_WIDGET', id: 'transit' };
    Reducer(rootReducer).withState(initialState).expect(action).toReturnState({
      ...stateWithTransit,
    });
  });

  it('should add the github widget to the dashboard', () => {
    const action = { type: 'ADD_WIDGET', id: 'github' };
    Reducer(rootReducer).withState(initialState).expect(action).toReturnState({
      ...stateWithGithub,
    });
  });

  it('should add the slack widget to the dashboard', () => {
    const action = { type: 'ADD_WIDGET', id: 'slack' };
    Reducer(rootReducer).withState(initialState).expect(action).toReturnState({
      ...stateWithSlack,
    });
  });

  it('should remove the transit widget from the dashboard', () => {
    const action = { type: 'REMOVE_WIDGET', id: 'transit' };
    Reducer(rootReducer).withState(stateWithTransit).expect(action).toReturnState({
      ...stateWithTransit,
      ids: [],
    });
  });

  it('should remove the github widget from the dashboard', () => {
    const action = { type: 'REMOVE_WIDGET', id: 'github' };
    Reducer(rootReducer).withState(stateWithGithub).expect(action).toReturnState({
      ...stateWithGithub,
      ids: [],
    });
  });

  it('should remove the slack widget from the dashboard', () => {
    const action = { type: 'REMOVE_WIDGET', id: 'slack' };
    Reducer(rootReducer).withState(stateWithSlack).expect(action).toReturnState({
      ...stateWithSlack,
      ids: [],
    });
  });

  it('should show modal to add widget', () => {
    const action = { type: 'SHOW_ADD_WIDGET_MODAL' };
    Reducer(rootReducer).withState(initialState).expect(action).toReturnState({
      ...initialState,
      showAddWidgetModal: true,
      showSidebar: false,
    });
  });

  it('should hide add widget modal', () => {
    const action = { type: 'HIDE_ADD_WIDGET_MODAL' };
    Reducer(rootReducer).withState(initialState).expect(action).toReturnState({
      ...initialState,
      showAddWidgetModal: false,
    });
  });

  it('should show dashboard sidebar', () => {
    const action = { type: 'SHOW_DASHBOARD_SIDEBAR' };
    Reducer(rootReducer).withState(initialState).expect(action).toReturnState({
      ...initialState,
      showSidebar: true,
    });
  });

  it('should hide dashboard sidebar', () => {
    const action = { type: 'HIDE_DASHBOARD_SIDEBAR' };
    Reducer(rootReducer).withState(initialState).expect(action).toReturnState({
      ...initialState,
      showSidebar: false,
    });
  });

  it('should show transit widget sidebar', () => {
    const action = { type: 'SHOW_WIDGET_SIDEBAR', id: 'transit' };
    Reducer(rootReducer).withState(stateWithTransit).expect(action).toReturnState({
      ...stateWithTransit,
      metadata: {
        ...stateWithTransit.metadata,
        [action.id]: {
          ...stateWithTransit.metadata[action.id],
          showSidebar: true,
        },
      },
      showSidebar: false,
    });
  });

  it('should show github widget sidebar', () => {
    const action = { type: 'SHOW_WIDGET_SIDEBAR', id: 'github' };
    Reducer(rootReducer).withState(stateWithGithub).expect(action).toReturnState({
      ...stateWithGithub,
      metadata: {
        ...stateWithGithub.metadata,
        [action.id]: {
          ...stateWithGithub.metadata[action.id],
          showSidebar: true,
        },
      },
      showSidebar: false,
    });
  });

  it('should show slack widget sidebar', () => {
    const action = { type: 'SHOW_WIDGET_SIDEBAR', id: 'slack' };
    Reducer(rootReducer).withState(stateWithSlack).expect(action).toReturnState({
      ...stateWithSlack,
      metadata: {
        ...stateWithSlack.metadata,
        [action.id]: {
          ...stateWithSlack.metadata[action.id],
          showSidebar: true,
        },
      },
      showSidebar: false,
    });
  });

  it('should hide transit widget sidebar', () => {
    const action = { type: 'HIDE_WIDGET_SIDEBAR', id: 'transit' };
    const state = {
      ...stateWithTransit,
      metadata: {
        ...stateWithTransit.metadata,
        transit: {
          ...stateWithTransit.metadata.transit,
          showSidebar: true,
        },
      },
    };
    Reducer(rootReducer).withState(state).expect(action).toReturnState({
      ...stateWithTransit,
      metadata: {
        ...stateWithTransit.metadata,
        [action.id]: {
          ...stateWithTransit.metadata[action.id],
          showSidebar: false,
        },
      },
    });
  });

  it('should hide github widget sidebar', () => {
    const action = { type: 'HIDE_WIDGET_SIDEBAR', id: 'github' };
    const state = {
      ...stateWithGithub,
      metadata: {
        ...stateWithGithub.metadata,
        github: {
          ...stateWithGithub.metadata.github,
          showSidebar: true,
        },
      },
    };
    Reducer(rootReducer).withState(state).expect(action).toReturnState({
      ...stateWithGithub,
      metadata: {
        ...stateWithGithub.metadata,
        [action.id]: {
          ...stateWithGithub.metadata[action.id],
          showSidebar: false,
        },
      },
    });
  });

  it('should hide slack widget sidebar', () => {
    const action = { type: 'HIDE_WIDGET_SIDEBAR', id: 'slack' };
    const state = {
      ...stateWithSlack,
      metadata: {
        ...stateWithSlack.metadata,
        slack: {
          ...stateWithSlack.metadata.slack,
          showSidebar: true,
        },
      },
    };
    Reducer(rootReducer).withState(state).expect(action).toReturnState({
      ...stateWithSlack,
      metadata: {
        ...stateWithSlack.metadata,
        [action.id]: {
          ...stateWithSlack.metadata[action.id],
          showSidebar: false,
        },
      },
    });
  });

  it('should lock in the dashboard', () => {
    const action = { type: 'LOCK_DASHBOARD' };
    Reducer(rootReducer).withState(stateWithTransit).expect(action).toReturnState({
      ...stateWithTransit,
      showSidebar: false,
      locked: true,
      grid: {
        ...stateWithTransit.grid,
        layout: stateWithTransit.grid.layout.map(layoutObj => (
          {
            ...layoutObj,
            static: true,
          }
        )),
      },
    });
  });

  it('should unlock the dashboard', () => {
    const action = { type: 'UNLOCK_DASHBOARD' };
    const state = {
      ...stateWithTransit,
      showSidebar: false,
      locked: true,
      grid: {
        ...stateWithTransit.grid,
        layout: stateWithTransit.grid.layout.map(layoutObj => (
          {
            ...layoutObj,
            static: true,
          }
        )),
      },
    };
    Reducer(rootReducer).withState(state).expect(action).toReturnState({
      ...stateWithTransit,
      showSidebar: false,
      locked: false,
    });
  });

  it('should persist new grid layout to state', () => {
    const action = {
      type: 'SAVE_LAYOUT_CHANGE',
      layout: [{ i: TRANSIT_WIDGET_ID, x: 2, y: 3, w: 6, h: 8, static: false }],
    };

    Reducer(rootReducer).withState(stateWithTransit).expect(action).toReturnState({
      byId: {},
      showSidebar: true,
      ids: [TRANSIT_WIDGET_ID],
      showAddWidgetModal: false,
      grid: {
        nextId: 1,
        layout: [
          { i: TRANSIT_WIDGET_ID, x: 2, y: 3, w: 6, h: 8, static: false },
        ],
        breakpoints: { lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 },
        cols: { lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 },
      },
      metadata: {
        transit: {
          type: 'transit',
          standardWidth: 6,
          standardHeight: 8,
          minWidth: 4,
          minHeight: 4,
          showSidebar: false,
        },
      },
    });
  });
});

describe('non-reducer functions', () => {
  it('should return new metadata with all widget sidebars not showing', () => {
    expect(collapseWidgetSidebars({ transit: {
      type: 'transit',
      standardWidth: 6,
      standardHeight: 8,
      minWidth: 4,
      minHeight: 4,
      showSidebar: true,
    },
    })).toEqual(stateWithTransit.metadata);
  });
});
