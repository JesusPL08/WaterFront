import { createRequire } from 'module';const require = createRequire(import.meta.url);
import {
  A,
  BidiModule,
  CdkDialogContainer,
  CdkPortalOutlet,
  CdkScrollable,
  Dialog,
  DialogConfig,
  DialogModule,
  ESCAPE,
  FocusTrap,
  HighContrastModeDetector,
  InteractivityChecker,
  NINE,
  Overlay,
  OverlayContainer,
  OverlayModule,
  Platform,
  PortalModule,
  Z,
  ZERO,
  _CdkPrivateStyleLoader,
  _IdGenerator,
  _VisuallyHiddenLoader,
  coerceNumberProperty,
  hasModifierKey
} from "./chunk-HY66KIZQ.js";
import "./chunk-6WIQB4SK.js";
import {
  DOCUMENT
} from "./chunk-77WQFBNV.js";
import {
  ANIMATION_MODULE_TYPE,
  APP_ID,
  ChangeDetectionStrategy,
  Component,
  Directive,
  ElementRef,
  EventEmitter,
  Injectable,
  InjectionToken,
  Injector,
  Input,
  NgModule,
  NgZone,
  QueryList,
  RendererFactory2,
  ViewEncapsulation,
  inject,
  setClassMetadata,
  ɵɵHostDirectivesFeature,
  ɵɵInheritDefinitionFeature,
  ɵɵNgOnChangesFeature,
  ɵɵattribute,
  ɵɵclassProp,
  ɵɵdefineComponent,
  ɵɵdefineDirective,
  ɵɵdefineInjectable,
  ɵɵdefineInjector,
  ɵɵdefineNgModule,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetInheritedFactory,
  ɵɵhostProperty,
  ɵɵlistener,
  ɵɵtemplate
} from "./chunk-X2IAVRK6.js";
import {
  require_cjs
} from "./chunk-FVV5GPUY.js";
import {
  require_operators
} from "./chunk-4QMZCE5I.js";
import "./chunk-U72ESA7A.js";
import {
  __spreadProps,
  __spreadValues,
  __toESM
} from "./chunk-XBPEBUD5.js";

// node_modules/@angular/cdk/fesm2022/overlay.mjs
var import_rxjs = __toESM(require_cjs(), 1);
var import_operators = __toESM(require_operators(), 1);
var FullscreenOverlayContainer = class _FullscreenOverlayContainer extends OverlayContainer {
  _renderer = inject(RendererFactory2).createRenderer(null, null);
  _fullScreenEventName;
  _cleanupFullScreenListener;
  constructor() {
    super();
  }
  ngOnDestroy() {
    super.ngOnDestroy();
    this._cleanupFullScreenListener?.();
  }
  _createContainer() {
    const eventName = this._getEventName();
    super._createContainer();
    this._adjustParentForFullscreenChange();
    if (eventName) {
      this._cleanupFullScreenListener?.();
      this._cleanupFullScreenListener = this._renderer.listen("document", eventName, () => {
        this._adjustParentForFullscreenChange();
      });
    }
  }
  _adjustParentForFullscreenChange() {
    if (this._containerElement) {
      const fullscreenElement = this.getFullscreenElement();
      const parent = fullscreenElement || this._document.body;
      parent.appendChild(this._containerElement);
    }
  }
  _getEventName() {
    if (!this._fullScreenEventName) {
      const _document = this._document;
      if (_document.fullscreenEnabled) {
        this._fullScreenEventName = "fullscreenchange";
      } else if (_document.webkitFullscreenEnabled) {
        this._fullScreenEventName = "webkitfullscreenchange";
      } else if (_document.mozFullScreenEnabled) {
        this._fullScreenEventName = "mozfullscreenchange";
      } else if (_document.msFullscreenEnabled) {
        this._fullScreenEventName = "MSFullscreenChange";
      }
    }
    return this._fullScreenEventName;
  }
  /**
   * When the page is put into fullscreen mode, a specific element is specified.
   * Only that element and its children are visible when in fullscreen mode.
   */
  getFullscreenElement() {
    const _document = this._document;
    return _document.fullscreenElement || _document.webkitFullscreenElement || _document.mozFullScreenElement || _document.msFullscreenElement || null;
  }
  static ɵfac = function FullscreenOverlayContainer_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _FullscreenOverlayContainer)();
  };
  static ɵprov = ɵɵdefineInjectable({
    token: _FullscreenOverlayContainer,
    factory: _FullscreenOverlayContainer.ɵfac,
    providedIn: "root"
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(FullscreenOverlayContainer, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], () => [], null);
})();

// node_modules/@angular/material/fesm2022/module-BnDTus5c.mjs
var import_rxjs7 = __toESM(require_cjs(), 1);
var import_operators5 = __toESM(require_operators(), 1);

// node_modules/@angular/cdk/fesm2022/list-key-manager-CyOIXo8P.mjs
var import_rxjs3 = __toESM(require_cjs(), 1);

// node_modules/@angular/cdk/fesm2022/typeahead-9ZW4Dtsf.mjs
var import_rxjs2 = __toESM(require_cjs(), 1);
var import_operators2 = __toESM(require_operators(), 1);
var DEFAULT_TYPEAHEAD_DEBOUNCE_INTERVAL_MS = 200;
var Typeahead = class {
  _letterKeyStream = new import_rxjs2.Subject();
  _items = [];
  _selectedItemIndex = -1;
  /** Buffer for the letters that the user has pressed */
  _pressedLetters = [];
  _skipPredicateFn;
  _selectedItem = new import_rxjs2.Subject();
  selectedItem = this._selectedItem;
  constructor(initialItems, config) {
    const typeAheadInterval = typeof config?.debounceInterval === "number" ? config.debounceInterval : DEFAULT_TYPEAHEAD_DEBOUNCE_INTERVAL_MS;
    if (config?.skipPredicate) {
      this._skipPredicateFn = config.skipPredicate;
    }
    if ((typeof ngDevMode === "undefined" || ngDevMode) && initialItems.length && initialItems.some((item) => typeof item.getLabel !== "function")) {
      throw new Error("KeyManager items in typeahead mode must implement the `getLabel` method.");
    }
    this.setItems(initialItems);
    this._setupKeyHandler(typeAheadInterval);
  }
  destroy() {
    this._pressedLetters = [];
    this._letterKeyStream.complete();
    this._selectedItem.complete();
  }
  setCurrentSelectedItemIndex(index) {
    this._selectedItemIndex = index;
  }
  setItems(items) {
    this._items = items;
  }
  handleKey(event) {
    const keyCode = event.keyCode;
    if (event.key && event.key.length === 1) {
      this._letterKeyStream.next(event.key.toLocaleUpperCase());
    } else if (keyCode >= A && keyCode <= Z || keyCode >= ZERO && keyCode <= NINE) {
      this._letterKeyStream.next(String.fromCharCode(keyCode));
    }
  }
  /** Gets whether the user is currently typing into the manager using the typeahead feature. */
  isTyping() {
    return this._pressedLetters.length > 0;
  }
  /** Resets the currently stored sequence of typed letters. */
  reset() {
    this._pressedLetters = [];
  }
  _setupKeyHandler(typeAheadInterval) {
    this._letterKeyStream.pipe((0, import_operators2.tap)((letter) => this._pressedLetters.push(letter)), (0, import_operators2.debounceTime)(typeAheadInterval), (0, import_operators2.filter)(() => this._pressedLetters.length > 0), (0, import_operators2.map)(() => this._pressedLetters.join("").toLocaleUpperCase())).subscribe((inputString) => {
      for (let i = 1; i < this._items.length + 1; i++) {
        const index = (this._selectedItemIndex + i) % this._items.length;
        const item = this._items[index];
        if (!this._skipPredicateFn?.(item) && item.getLabel?.().toLocaleUpperCase().trim().indexOf(inputString) === 0) {
          this._selectedItem.next(item);
          break;
        }
      }
      this._pressedLetters = [];
    });
  }
};

// node_modules/@angular/cdk/fesm2022/a11y.mjs
var import_rxjs6 = __toESM(require_cjs(), 1);

// node_modules/@angular/cdk/fesm2022/tree-key-manager-KnCoIkIC.mjs
var import_rxjs5 = __toESM(require_cjs(), 1);
var import_operators3 = __toESM(require_operators(), 1);

// node_modules/@angular/cdk/fesm2022/coercion/private.mjs
var import_rxjs4 = __toESM(require_cjs(), 1);
function coerceObservable(data) {
  if (!(0, import_rxjs4.isObservable)(data)) {
    return (0, import_rxjs4.of)(data);
  }
  return data;
}

// node_modules/@angular/cdk/fesm2022/tree-key-manager-KnCoIkIC.mjs
var TreeKeyManager = class {
  /** The index of the currently active (focused) item. */
  _activeItemIndex = -1;
  /** The currently active (focused) item. */
  _activeItem = null;
  /** Whether or not we activate the item when it's focused. */
  _shouldActivationFollowFocus = false;
  /**
   * The orientation that the tree is laid out in. In `rtl` mode, the behavior of Left and
   * Right arrow are switched.
   */
  _horizontalOrientation = "ltr";
  /**
   * Predicate function that can be used to check whether an item should be skipped
   * by the key manager.
   *
   * The default value for this doesn't skip any elements in order to keep tree items focusable
   * when disabled. This aligns with ARIA guidelines:
   * https://www.w3.org/WAI/ARIA/apg/practices/keyboard-interface/#focusabilityofdisabledcontrols.
   */
  _skipPredicateFn = (_item) => false;
  /** Function to determine equivalent items. */
  _trackByFn = (item) => item;
  /** Synchronous cache of the items to manage. */
  _items = [];
  _typeahead;
  _typeaheadSubscription = import_rxjs5.Subscription.EMPTY;
  _hasInitialFocused = false;
  _initializeFocus() {
    if (this._hasInitialFocused || this._items.length === 0) {
      return;
    }
    let activeIndex = 0;
    for (let i = 0; i < this._items.length; i++) {
      if (!this._skipPredicateFn(this._items[i]) && !this._isItemDisabled(this._items[i])) {
        activeIndex = i;
        break;
      }
    }
    const activeItem = this._items[activeIndex];
    if (activeItem.makeFocusable) {
      this._activeItem?.unfocus();
      this._activeItemIndex = activeIndex;
      this._activeItem = activeItem;
      this._typeahead?.setCurrentSelectedItemIndex(activeIndex);
      activeItem.makeFocusable();
    } else {
      this.focusItem(activeIndex);
    }
    this._hasInitialFocused = true;
  }
  /**
   *
   * @param items List of TreeKeyManager options. Can be synchronous or asynchronous.
   * @param config Optional configuration options. By default, use 'ltr' horizontal orientation. By
   * default, do not skip any nodes. By default, key manager only calls `focus` method when items
   * are focused and does not call `activate`. If `typeaheadDefaultInterval` is `true`, use a
   * default interval of 200ms.
   */
  constructor(items, config) {
    if (items instanceof QueryList) {
      this._items = items.toArray();
      items.changes.subscribe((newItems) => {
        this._items = newItems.toArray();
        this._typeahead?.setItems(this._items);
        this._updateActiveItemIndex(this._items);
        this._initializeFocus();
      });
    } else if ((0, import_rxjs5.isObservable)(items)) {
      items.subscribe((newItems) => {
        this._items = newItems;
        this._typeahead?.setItems(newItems);
        this._updateActiveItemIndex(newItems);
        this._initializeFocus();
      });
    } else {
      this._items = items;
      this._initializeFocus();
    }
    if (typeof config.shouldActivationFollowFocus === "boolean") {
      this._shouldActivationFollowFocus = config.shouldActivationFollowFocus;
    }
    if (config.horizontalOrientation) {
      this._horizontalOrientation = config.horizontalOrientation;
    }
    if (config.skipPredicate) {
      this._skipPredicateFn = config.skipPredicate;
    }
    if (config.trackBy) {
      this._trackByFn = config.trackBy;
    }
    if (typeof config.typeAheadDebounceInterval !== "undefined") {
      this._setTypeAhead(config.typeAheadDebounceInterval);
    }
  }
  /** Stream that emits any time the focused item changes. */
  change = new import_rxjs5.Subject();
  /** Cleans up the key manager. */
  destroy() {
    this._typeaheadSubscription.unsubscribe();
    this._typeahead?.destroy();
    this.change.complete();
  }
  /**
   * Handles a keyboard event on the tree.
   * @param event Keyboard event that represents the user interaction with the tree.
   */
  onKeydown(event) {
    const key = event.key;
    switch (key) {
      case "Tab":
        return;
      case "ArrowDown":
        this._focusNextItem();
        break;
      case "ArrowUp":
        this._focusPreviousItem();
        break;
      case "ArrowRight":
        this._horizontalOrientation === "rtl" ? this._collapseCurrentItem() : this._expandCurrentItem();
        break;
      case "ArrowLeft":
        this._horizontalOrientation === "rtl" ? this._expandCurrentItem() : this._collapseCurrentItem();
        break;
      case "Home":
        this._focusFirstItem();
        break;
      case "End":
        this._focusLastItem();
        break;
      case "Enter":
      case " ":
        this._activateCurrentItem();
        break;
      default:
        if (event.key === "*") {
          this._expandAllItemsAtCurrentItemLevel();
          break;
        }
        this._typeahead?.handleKey(event);
        return;
    }
    this._typeahead?.reset();
    event.preventDefault();
  }
  /** Index of the currently active item. */
  getActiveItemIndex() {
    return this._activeItemIndex;
  }
  /** The currently active item. */
  getActiveItem() {
    return this._activeItem;
  }
  /** Focus the first available item. */
  _focusFirstItem() {
    this.focusItem(this._findNextAvailableItemIndex(-1));
  }
  /** Focus the last available item. */
  _focusLastItem() {
    this.focusItem(this._findPreviousAvailableItemIndex(this._items.length));
  }
  /** Focus the next available item. */
  _focusNextItem() {
    this.focusItem(this._findNextAvailableItemIndex(this._activeItemIndex));
  }
  /** Focus the previous available item. */
  _focusPreviousItem() {
    this.focusItem(this._findPreviousAvailableItemIndex(this._activeItemIndex));
  }
  focusItem(itemOrIndex, options = {}) {
    options.emitChangeEvent ??= true;
    let index = typeof itemOrIndex === "number" ? itemOrIndex : this._items.findIndex((item) => this._trackByFn(item) === this._trackByFn(itemOrIndex));
    if (index < 0 || index >= this._items.length) {
      return;
    }
    const activeItem = this._items[index];
    if (this._activeItem !== null && this._trackByFn(activeItem) === this._trackByFn(this._activeItem)) {
      return;
    }
    const previousActiveItem = this._activeItem;
    this._activeItem = activeItem ?? null;
    this._activeItemIndex = index;
    this._typeahead?.setCurrentSelectedItemIndex(index);
    this._activeItem?.focus();
    previousActiveItem?.unfocus();
    if (options.emitChangeEvent) {
      this.change.next(this._activeItem);
    }
    if (this._shouldActivationFollowFocus) {
      this._activateCurrentItem();
    }
  }
  _updateActiveItemIndex(newItems) {
    const activeItem = this._activeItem;
    if (!activeItem) {
      return;
    }
    const newIndex = newItems.findIndex((item) => this._trackByFn(item) === this._trackByFn(activeItem));
    if (newIndex > -1 && newIndex !== this._activeItemIndex) {
      this._activeItemIndex = newIndex;
      this._typeahead?.setCurrentSelectedItemIndex(newIndex);
    }
  }
  _setTypeAhead(debounceInterval) {
    this._typeahead = new Typeahead(this._items, {
      debounceInterval: typeof debounceInterval === "number" ? debounceInterval : void 0,
      skipPredicate: (item) => this._skipPredicateFn(item)
    });
    this._typeaheadSubscription = this._typeahead.selectedItem.subscribe((item) => {
      this.focusItem(item);
    });
  }
  _findNextAvailableItemIndex(startingIndex) {
    for (let i = startingIndex + 1; i < this._items.length; i++) {
      if (!this._skipPredicateFn(this._items[i])) {
        return i;
      }
    }
    return startingIndex;
  }
  _findPreviousAvailableItemIndex(startingIndex) {
    for (let i = startingIndex - 1; i >= 0; i--) {
      if (!this._skipPredicateFn(this._items[i])) {
        return i;
      }
    }
    return startingIndex;
  }
  /**
   * If the item is already expanded, we collapse the item. Otherwise, we will focus the parent.
   */
  _collapseCurrentItem() {
    if (!this._activeItem) {
      return;
    }
    if (this._isCurrentItemExpanded()) {
      this._activeItem.collapse();
    } else {
      const parent = this._activeItem.getParent();
      if (!parent || this._skipPredicateFn(parent)) {
        return;
      }
      this.focusItem(parent);
    }
  }
  /**
   * If the item is already collapsed, we expand the item. Otherwise, we will focus the first child.
   */
  _expandCurrentItem() {
    if (!this._activeItem) {
      return;
    }
    if (!this._isCurrentItemExpanded()) {
      this._activeItem.expand();
    } else {
      coerceObservable(this._activeItem.getChildren()).pipe((0, import_operators3.take)(1)).subscribe((children) => {
        const firstChild = children.find((child) => !this._skipPredicateFn(child));
        if (!firstChild) {
          return;
        }
        this.focusItem(firstChild);
      });
    }
  }
  _isCurrentItemExpanded() {
    if (!this._activeItem) {
      return false;
    }
    return typeof this._activeItem.isExpanded === "boolean" ? this._activeItem.isExpanded : this._activeItem.isExpanded();
  }
  _isItemDisabled(item) {
    return typeof item.isDisabled === "boolean" ? item.isDisabled : item.isDisabled?.();
  }
  /** For all items that are the same level as the current item, we expand those items. */
  _expandAllItemsAtCurrentItemLevel() {
    if (!this._activeItem) {
      return;
    }
    const parent = this._activeItem.getParent();
    let itemsToExpand;
    if (!parent) {
      itemsToExpand = (0, import_rxjs5.of)(this._items.filter((item) => item.getParent() === null));
    } else {
      itemsToExpand = coerceObservable(parent.getChildren());
    }
    itemsToExpand.pipe((0, import_operators3.take)(1)).subscribe((items) => {
      for (const item of items) {
        item.expand();
      }
    });
  }
  _activateCurrentItem() {
    this._activeItem?.activate();
  }
};
function TREE_KEY_MANAGER_FACTORY() {
  return (items, options) => new TreeKeyManager(items, options);
}
var TREE_KEY_MANAGER = new InjectionToken("tree-key-manager", {
  providedIn: "root",
  factory: TREE_KEY_MANAGER_FACTORY
});

// node_modules/@angular/cdk/fesm2022/a11y.mjs
var import_operators4 = __toESM(require_operators(), 1);
var ID_DELIMITER = " ";
function addAriaReferencedId(el, attr, id) {
  const ids = getAriaReferenceIds(el, attr);
  id = id.trim();
  if (ids.some((existingId) => existingId.trim() === id)) {
    return;
  }
  ids.push(id);
  el.setAttribute(attr, ids.join(ID_DELIMITER));
}
function removeAriaReferencedId(el, attr, id) {
  const ids = getAriaReferenceIds(el, attr);
  id = id.trim();
  const filteredIds = ids.filter((val) => val !== id);
  if (filteredIds.length) {
    el.setAttribute(attr, filteredIds.join(ID_DELIMITER));
  } else {
    el.removeAttribute(attr);
  }
}
function getAriaReferenceIds(el, attr) {
  const attrValue = el.getAttribute(attr);
  return attrValue?.match(/\S+/g) ?? [];
}
var CDK_DESCRIBEDBY_ID_PREFIX = "cdk-describedby-message";
var CDK_DESCRIBEDBY_HOST_ATTRIBUTE = "cdk-describedby-host";
var nextId = 0;
var AriaDescriber = class _AriaDescriber {
  _platform = inject(Platform);
  _document = inject(DOCUMENT);
  /** Map of all registered message elements that have been placed into the document. */
  _messageRegistry = /* @__PURE__ */ new Map();
  /** Container for all registered messages. */
  _messagesContainer = null;
  /** Unique ID for the service. */
  _id = `${nextId++}`;
  constructor() {
    inject(_CdkPrivateStyleLoader).load(_VisuallyHiddenLoader);
    this._id = inject(APP_ID) + "-" + nextId++;
  }
  describe(hostElement, message, role) {
    if (!this._canBeDescribed(hostElement, message)) {
      return;
    }
    const key = getKey(message, role);
    if (typeof message !== "string") {
      setMessageId(message, this._id);
      this._messageRegistry.set(key, {
        messageElement: message,
        referenceCount: 0
      });
    } else if (!this._messageRegistry.has(key)) {
      this._createMessageElement(message, role);
    }
    if (!this._isElementDescribedByMessage(hostElement, key)) {
      this._addMessageReference(hostElement, key);
    }
  }
  removeDescription(hostElement, message, role) {
    if (!message || !this._isElementNode(hostElement)) {
      return;
    }
    const key = getKey(message, role);
    if (this._isElementDescribedByMessage(hostElement, key)) {
      this._removeMessageReference(hostElement, key);
    }
    if (typeof message === "string") {
      const registeredMessage = this._messageRegistry.get(key);
      if (registeredMessage && registeredMessage.referenceCount === 0) {
        this._deleteMessageElement(key);
      }
    }
    if (this._messagesContainer?.childNodes.length === 0) {
      this._messagesContainer.remove();
      this._messagesContainer = null;
    }
  }
  /** Unregisters all created message elements and removes the message container. */
  ngOnDestroy() {
    const describedElements = this._document.querySelectorAll(`[${CDK_DESCRIBEDBY_HOST_ATTRIBUTE}="${this._id}"]`);
    for (let i = 0; i < describedElements.length; i++) {
      this._removeCdkDescribedByReferenceIds(describedElements[i]);
      describedElements[i].removeAttribute(CDK_DESCRIBEDBY_HOST_ATTRIBUTE);
    }
    this._messagesContainer?.remove();
    this._messagesContainer = null;
    this._messageRegistry.clear();
  }
  /**
   * Creates a new element in the visually hidden message container element with the message
   * as its content and adds it to the message registry.
   */
  _createMessageElement(message, role) {
    const messageElement = this._document.createElement("div");
    setMessageId(messageElement, this._id);
    messageElement.textContent = message;
    if (role) {
      messageElement.setAttribute("role", role);
    }
    this._createMessagesContainer();
    this._messagesContainer.appendChild(messageElement);
    this._messageRegistry.set(getKey(message, role), {
      messageElement,
      referenceCount: 0
    });
  }
  /** Deletes the message element from the global messages container. */
  _deleteMessageElement(key) {
    this._messageRegistry.get(key)?.messageElement?.remove();
    this._messageRegistry.delete(key);
  }
  /** Creates the global container for all aria-describedby messages. */
  _createMessagesContainer() {
    if (this._messagesContainer) {
      return;
    }
    const containerClassName = "cdk-describedby-message-container";
    const serverContainers = this._document.querySelectorAll(`.${containerClassName}[platform="server"]`);
    for (let i = 0; i < serverContainers.length; i++) {
      serverContainers[i].remove();
    }
    const messagesContainer = this._document.createElement("div");
    messagesContainer.style.visibility = "hidden";
    messagesContainer.classList.add(containerClassName);
    messagesContainer.classList.add("cdk-visually-hidden");
    if (!this._platform.isBrowser) {
      messagesContainer.setAttribute("platform", "server");
    }
    this._document.body.appendChild(messagesContainer);
    this._messagesContainer = messagesContainer;
  }
  /** Removes all cdk-describedby messages that are hosted through the element. */
  _removeCdkDescribedByReferenceIds(element) {
    const originalReferenceIds = getAriaReferenceIds(element, "aria-describedby").filter((id) => id.indexOf(CDK_DESCRIBEDBY_ID_PREFIX) != 0);
    element.setAttribute("aria-describedby", originalReferenceIds.join(" "));
  }
  /**
   * Adds a message reference to the element using aria-describedby and increments the registered
   * message's reference count.
   */
  _addMessageReference(element, key) {
    const registeredMessage = this._messageRegistry.get(key);
    addAriaReferencedId(element, "aria-describedby", registeredMessage.messageElement.id);
    element.setAttribute(CDK_DESCRIBEDBY_HOST_ATTRIBUTE, this._id);
    registeredMessage.referenceCount++;
  }
  /**
   * Removes a message reference from the element using aria-describedby
   * and decrements the registered message's reference count.
   */
  _removeMessageReference(element, key) {
    const registeredMessage = this._messageRegistry.get(key);
    registeredMessage.referenceCount--;
    removeAriaReferencedId(element, "aria-describedby", registeredMessage.messageElement.id);
    element.removeAttribute(CDK_DESCRIBEDBY_HOST_ATTRIBUTE);
  }
  /** Returns true if the element has been described by the provided message ID. */
  _isElementDescribedByMessage(element, key) {
    const referenceIds = getAriaReferenceIds(element, "aria-describedby");
    const registeredMessage = this._messageRegistry.get(key);
    const messageId = registeredMessage && registeredMessage.messageElement.id;
    return !!messageId && referenceIds.indexOf(messageId) != -1;
  }
  /** Determines whether a message can be described on a particular element. */
  _canBeDescribed(element, message) {
    if (!this._isElementNode(element)) {
      return false;
    }
    if (message && typeof message === "object") {
      return true;
    }
    const trimmedMessage = message == null ? "" : `${message}`.trim();
    const ariaLabel = element.getAttribute("aria-label");
    return trimmedMessage ? !ariaLabel || ariaLabel.trim() !== trimmedMessage : false;
  }
  /** Checks whether a node is an Element node. */
  _isElementNode(element) {
    return element.nodeType === this._document.ELEMENT_NODE;
  }
  static ɵfac = function AriaDescriber_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _AriaDescriber)();
  };
  static ɵprov = ɵɵdefineInjectable({
    token: _AriaDescriber,
    factory: _AriaDescriber.ɵfac,
    providedIn: "root"
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(AriaDescriber, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], () => [], null);
})();
function getKey(message, role) {
  return typeof message === "string" ? `${role || ""}/${message}` : message;
}
function setMessageId(element, serviceId) {
  if (!element.id) {
    element.id = `${CDK_DESCRIBEDBY_ID_PREFIX}-${serviceId}-${nextId++}`;
  }
}
var ConfigurableFocusTrap = class extends FocusTrap {
  _focusTrapManager;
  _inertStrategy;
  /** Whether the FocusTrap is enabled. */
  get enabled() {
    return this._enabled;
  }
  set enabled(value) {
    this._enabled = value;
    if (this._enabled) {
      this._focusTrapManager.register(this);
    } else {
      this._focusTrapManager.deregister(this);
    }
  }
  constructor(_element, _checker, _ngZone, _document, _focusTrapManager, _inertStrategy, config, injector) {
    super(_element, _checker, _ngZone, _document, config.defer, injector);
    this._focusTrapManager = _focusTrapManager;
    this._inertStrategy = _inertStrategy;
    this._focusTrapManager.register(this);
  }
  /** Notifies the FocusTrapManager that this FocusTrap will be destroyed. */
  destroy() {
    this._focusTrapManager.deregister(this);
    super.destroy();
  }
  /** @docs-private Implemented as part of ManagedFocusTrap. */
  _enable() {
    this._inertStrategy.preventFocus(this);
    this.toggleAnchors(true);
  }
  /** @docs-private Implemented as part of ManagedFocusTrap. */
  _disable() {
    this._inertStrategy.allowFocus(this);
    this.toggleAnchors(false);
  }
};
var EventListenerFocusTrapInertStrategy = class {
  /** Focus event handler. */
  _listener = null;
  /** Adds a document event listener that keeps focus inside the FocusTrap. */
  preventFocus(focusTrap) {
    if (this._listener) {
      focusTrap._document.removeEventListener("focus", this._listener, true);
    }
    this._listener = (e) => this._trapFocus(focusTrap, e);
    focusTrap._ngZone.runOutsideAngular(() => {
      focusTrap._document.addEventListener("focus", this._listener, true);
    });
  }
  /** Removes the event listener added in preventFocus. */
  allowFocus(focusTrap) {
    if (!this._listener) {
      return;
    }
    focusTrap._document.removeEventListener("focus", this._listener, true);
    this._listener = null;
  }
  /**
   * Refocuses the first element in the FocusTrap if the focus event target was outside
   * the FocusTrap.
   *
   * This is an event listener callback. The event listener is added in runOutsideAngular,
   * so all this code runs outside Angular as well.
   */
  _trapFocus(focusTrap, event) {
    const target = event.target;
    const focusTrapRoot = focusTrap._element;
    if (target && !focusTrapRoot.contains(target) && !target.closest?.("div.cdk-overlay-pane")) {
      setTimeout(() => {
        if (focusTrap.enabled && !focusTrapRoot.contains(focusTrap._document.activeElement)) {
          focusTrap.focusFirstTabbableElement();
        }
      });
    }
  }
};
var FOCUS_TRAP_INERT_STRATEGY = new InjectionToken("FOCUS_TRAP_INERT_STRATEGY");
var FocusTrapManager = class _FocusTrapManager {
  // A stack of the FocusTraps on the page. Only the FocusTrap at the
  // top of the stack is active.
  _focusTrapStack = [];
  /**
   * Disables the FocusTrap at the top of the stack, and then pushes
   * the new FocusTrap onto the stack.
   */
  register(focusTrap) {
    this._focusTrapStack = this._focusTrapStack.filter((ft) => ft !== focusTrap);
    let stack = this._focusTrapStack;
    if (stack.length) {
      stack[stack.length - 1]._disable();
    }
    stack.push(focusTrap);
    focusTrap._enable();
  }
  /**
   * Removes the FocusTrap from the stack, and activates the
   * FocusTrap that is the new top of the stack.
   */
  deregister(focusTrap) {
    focusTrap._disable();
    const stack = this._focusTrapStack;
    const i = stack.indexOf(focusTrap);
    if (i !== -1) {
      stack.splice(i, 1);
      if (stack.length) {
        stack[stack.length - 1]._enable();
      }
    }
  }
  static ɵfac = function FocusTrapManager_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _FocusTrapManager)();
  };
  static ɵprov = ɵɵdefineInjectable({
    token: _FocusTrapManager,
    factory: _FocusTrapManager.ɵfac,
    providedIn: "root"
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(FocusTrapManager, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], null, null);
})();
var ConfigurableFocusTrapFactory = class _ConfigurableFocusTrapFactory {
  _checker = inject(InteractivityChecker);
  _ngZone = inject(NgZone);
  _focusTrapManager = inject(FocusTrapManager);
  _document = inject(DOCUMENT);
  _inertStrategy;
  _injector = inject(Injector);
  constructor() {
    const inertStrategy = inject(FOCUS_TRAP_INERT_STRATEGY, {
      optional: true
    });
    this._inertStrategy = inertStrategy || new EventListenerFocusTrapInertStrategy();
  }
  create(element, config = {
    defer: false
  }) {
    let configObject;
    if (typeof config === "boolean") {
      configObject = {
        defer: config
      };
    } else {
      configObject = config;
    }
    return new ConfigurableFocusTrap(element, this._checker, this._ngZone, this._document, this._focusTrapManager, this._inertStrategy, configObject, this._injector);
  }
  static ɵfac = function ConfigurableFocusTrapFactory_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _ConfigurableFocusTrapFactory)();
  };
  static ɵprov = ɵɵdefineInjectable({
    token: _ConfigurableFocusTrapFactory,
    factory: _ConfigurableFocusTrapFactory.ɵfac,
    providedIn: "root"
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ConfigurableFocusTrapFactory, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], () => [], null);
})();

// node_modules/@angular/material/fesm2022/common-module-WayjW0Pb.mjs
var MATERIAL_SANITY_CHECKS = new InjectionToken("mat-sanity-checks", {
  providedIn: "root",
  factory: () => true
});
var MatCommonModule = class _MatCommonModule {
  constructor() {
    inject(HighContrastModeDetector)._applyBodyHighContrastModeCssClasses();
  }
  static ɵfac = function MatCommonModule_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _MatCommonModule)();
  };
  static ɵmod = ɵɵdefineNgModule({
    type: _MatCommonModule,
    imports: [BidiModule],
    exports: [BidiModule]
  });
  static ɵinj = ɵɵdefineInjector({
    imports: [BidiModule, BidiModule]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MatCommonModule, [{
    type: NgModule,
    args: [{
      imports: [BidiModule],
      exports: [BidiModule]
    }]
  }], () => [], null);
})();

// node_modules/@angular/material/fesm2022/module-BnDTus5c.mjs
function MatDialogContainer_ng_template_2_Template(rf, ctx) {
}
var MatDialogConfig = class {
  /**
   * Where the attached component should live in Angular's *logical* component tree.
   * This affects what is available for injection and the change detection order for the
   * component instantiated inside of the dialog. This does not affect where the dialog
   * content will be rendered.
   */
  viewContainerRef;
  /**
   * Injector used for the instantiation of the component to be attached. If provided,
   * takes precedence over the injector indirectly provided by `ViewContainerRef`.
   */
  injector;
  /** ID for the dialog. If omitted, a unique one will be generated. */
  id;
  /** The ARIA role of the dialog element. */
  role = "dialog";
  /** Custom class for the overlay pane. */
  panelClass = "";
  /** Whether the dialog has a backdrop. */
  hasBackdrop = true;
  /** Custom class for the backdrop. */
  backdropClass = "";
  /** Whether the user can use escape or clicking on the backdrop to close the modal. */
  disableClose = false;
  /** Width of the dialog. */
  width = "";
  /** Height of the dialog. */
  height = "";
  /** Min-width of the dialog. If a number is provided, assumes pixel units. */
  minWidth;
  /** Min-height of the dialog. If a number is provided, assumes pixel units. */
  minHeight;
  /** Max-width of the dialog. If a number is provided, assumes pixel units. */
  maxWidth;
  /** Max-height of the dialog. If a number is provided, assumes pixel units. */
  maxHeight;
  /** Position overrides. */
  position;
  /** Data being injected into the child component. */
  data = null;
  /** Layout direction for the dialog's content. */
  direction;
  /** ID of the element that describes the dialog. */
  ariaDescribedBy = null;
  /** ID of the element that labels the dialog. */
  ariaLabelledBy = null;
  /** Aria label to assign to the dialog element. */
  ariaLabel = null;
  /**
   * Whether this is a modal dialog. Used to set the `aria-modal` attribute. Off by default,
   * because it can interfere with other overlay-based components (e.g. `mat-select`) and because
   * it is redundant since the dialog marks all outside content as `aria-hidden` anyway.
   */
  ariaModal = false;
  /**
   * Where the dialog should focus on open.
   * @breaking-change 14.0.0 Remove boolean option from autoFocus. Use string or
   * AutoFocusTarget instead.
   */
  autoFocus = "first-tabbable";
  /**
   * Whether the dialog should restore focus to the
   * previously-focused element, after it's closed.
   */
  restoreFocus = true;
  /** Whether to wait for the opening animation to finish before trapping focus. */
  delayFocusTrap = true;
  /** Scroll strategy to be used for the dialog. */
  scrollStrategy;
  /**
   * Whether the dialog should close when the user goes backwards/forwards in history.
   * Note that this usually doesn't include clicking on links (unless the user is using
   * the `HashLocationStrategy`).
   */
  closeOnNavigation = true;
  /**
   * Alternate `ComponentFactoryResolver` to use when resolving the associated component.
   * @deprecated No longer used. Will be removed.
   * @breaking-change 20.0.0
   */
  componentFactoryResolver;
  /**
   * Duration of the enter animation in ms.
   * Should be a number, string type is deprecated.
   * @breaking-change 17.0.0 Remove string signature.
   */
  enterAnimationDuration;
  /**
   * Duration of the exit animation in ms.
   * Should be a number, string type is deprecated.
   * @breaking-change 17.0.0 Remove string signature.
   */
  exitAnimationDuration;
};
var OPEN_CLASS = "mdc-dialog--open";
var OPENING_CLASS = "mdc-dialog--opening";
var CLOSING_CLASS = "mdc-dialog--closing";
var OPEN_ANIMATION_DURATION = 150;
var CLOSE_ANIMATION_DURATION = 75;
var MatDialogContainer = class _MatDialogContainer extends CdkDialogContainer {
  _animationMode = inject(ANIMATION_MODULE_TYPE, {
    optional: true
  });
  /** Emits when an animation state changes. */
  _animationStateChanged = new EventEmitter();
  /** Whether animations are enabled. */
  _animationsEnabled = this._animationMode !== "NoopAnimations";
  /** Number of actions projected in the dialog. */
  _actionSectionCount = 0;
  /** Host element of the dialog container component. */
  _hostElement = this._elementRef.nativeElement;
  /** Duration of the dialog open animation. */
  _enterAnimationDuration = this._animationsEnabled ? parseCssTime(this._config.enterAnimationDuration) ?? OPEN_ANIMATION_DURATION : 0;
  /** Duration of the dialog close animation. */
  _exitAnimationDuration = this._animationsEnabled ? parseCssTime(this._config.exitAnimationDuration) ?? CLOSE_ANIMATION_DURATION : 0;
  /** Current timer for dialog animations. */
  _animationTimer = null;
  _contentAttached() {
    super._contentAttached();
    this._startOpenAnimation();
  }
  /** Starts the dialog open animation if enabled. */
  _startOpenAnimation() {
    this._animationStateChanged.emit({
      state: "opening",
      totalTime: this._enterAnimationDuration
    });
    if (this._animationsEnabled) {
      this._hostElement.style.setProperty(TRANSITION_DURATION_PROPERTY, `${this._enterAnimationDuration}ms`);
      this._requestAnimationFrame(() => this._hostElement.classList.add(OPENING_CLASS, OPEN_CLASS));
      this._waitForAnimationToComplete(this._enterAnimationDuration, this._finishDialogOpen);
    } else {
      this._hostElement.classList.add(OPEN_CLASS);
      Promise.resolve().then(() => this._finishDialogOpen());
    }
  }
  /**
   * Starts the exit animation of the dialog if enabled. This method is
   * called by the dialog ref.
   */
  _startExitAnimation() {
    this._animationStateChanged.emit({
      state: "closing",
      totalTime: this._exitAnimationDuration
    });
    this._hostElement.classList.remove(OPEN_CLASS);
    if (this._animationsEnabled) {
      this._hostElement.style.setProperty(TRANSITION_DURATION_PROPERTY, `${this._exitAnimationDuration}ms`);
      this._requestAnimationFrame(() => this._hostElement.classList.add(CLOSING_CLASS));
      this._waitForAnimationToComplete(this._exitAnimationDuration, this._finishDialogClose);
    } else {
      Promise.resolve().then(() => this._finishDialogClose());
    }
  }
  /**
   * Updates the number action sections.
   * @param delta Increase/decrease in the number of sections.
   */
  _updateActionSectionCount(delta) {
    this._actionSectionCount += delta;
    this._changeDetectorRef.markForCheck();
  }
  /**
   * Completes the dialog open by clearing potential animation classes, trapping
   * focus and emitting an opened event.
   */
  _finishDialogOpen = () => {
    this._clearAnimationClasses();
    this._openAnimationDone(this._enterAnimationDuration);
  };
  /**
   * Completes the dialog close by clearing potential animation classes, restoring
   * focus and emitting a closed event.
   */
  _finishDialogClose = () => {
    this._clearAnimationClasses();
    this._animationStateChanged.emit({
      state: "closed",
      totalTime: this._exitAnimationDuration
    });
  };
  /** Clears all dialog animation classes. */
  _clearAnimationClasses() {
    this._hostElement.classList.remove(OPENING_CLASS, CLOSING_CLASS);
  }
  _waitForAnimationToComplete(duration, callback) {
    if (this._animationTimer !== null) {
      clearTimeout(this._animationTimer);
    }
    this._animationTimer = setTimeout(callback, duration);
  }
  /** Runs a callback in `requestAnimationFrame`, if available. */
  _requestAnimationFrame(callback) {
    this._ngZone.runOutsideAngular(() => {
      if (typeof requestAnimationFrame === "function") {
        requestAnimationFrame(callback);
      } else {
        callback();
      }
    });
  }
  _captureInitialFocus() {
    if (!this._config.delayFocusTrap) {
      this._trapFocus();
    }
  }
  /**
   * Callback for when the open dialog animation has finished. Intended to
   * be called by sub-classes that use different animation implementations.
   */
  _openAnimationDone(totalTime) {
    if (this._config.delayFocusTrap) {
      this._trapFocus();
    }
    this._animationStateChanged.next({
      state: "opened",
      totalTime
    });
  }
  ngOnDestroy() {
    super.ngOnDestroy();
    if (this._animationTimer !== null) {
      clearTimeout(this._animationTimer);
    }
  }
  attachComponentPortal(portal) {
    const ref = super.attachComponentPortal(portal);
    ref.location.nativeElement.classList.add("mat-mdc-dialog-component-host");
    return ref;
  }
  static ɵfac = /* @__PURE__ */ (() => {
    let ɵMatDialogContainer_BaseFactory;
    return function MatDialogContainer_Factory(__ngFactoryType__) {
      return (ɵMatDialogContainer_BaseFactory || (ɵMatDialogContainer_BaseFactory = ɵɵgetInheritedFactory(_MatDialogContainer)))(__ngFactoryType__ || _MatDialogContainer);
    };
  })();
  static ɵcmp = ɵɵdefineComponent({
    type: _MatDialogContainer,
    selectors: [["mat-dialog-container"]],
    hostAttrs: ["tabindex", "-1", 1, "mat-mdc-dialog-container", "mdc-dialog"],
    hostVars: 10,
    hostBindings: function MatDialogContainer_HostBindings(rf, ctx) {
      if (rf & 2) {
        ɵɵhostProperty("id", ctx._config.id);
        ɵɵattribute("aria-modal", ctx._config.ariaModal)("role", ctx._config.role)("aria-labelledby", ctx._config.ariaLabel ? null : ctx._ariaLabelledByQueue[0])("aria-label", ctx._config.ariaLabel)("aria-describedby", ctx._config.ariaDescribedBy || null);
        ɵɵclassProp("_mat-animation-noopable", !ctx._animationsEnabled)("mat-mdc-dialog-container-with-actions", ctx._actionSectionCount > 0);
      }
    },
    features: [ɵɵInheritDefinitionFeature],
    decls: 3,
    vars: 0,
    consts: [[1, "mat-mdc-dialog-inner-container", "mdc-dialog__container"], [1, "mat-mdc-dialog-surface", "mdc-dialog__surface"], ["cdkPortalOutlet", ""]],
    template: function MatDialogContainer_Template(rf, ctx) {
      if (rf & 1) {
        ɵɵelementStart(0, "div", 0)(1, "div", 1);
        ɵɵtemplate(2, MatDialogContainer_ng_template_2_Template, 0, 0, "ng-template", 2);
        ɵɵelementEnd()();
      }
    },
    dependencies: [CdkPortalOutlet],
    styles: ['.mat-mdc-dialog-container{width:100%;height:100%;display:block;box-sizing:border-box;max-height:inherit;min-height:inherit;min-width:inherit;max-width:inherit;outline:0}.cdk-overlay-pane.mat-mdc-dialog-panel{max-width:var(--mat-dialog-container-max-width, 560px);min-width:var(--mat-dialog-container-min-width, 280px)}@media(max-width: 599px){.cdk-overlay-pane.mat-mdc-dialog-panel{max-width:var(--mat-dialog-container-small-max-width, calc(100vw - 32px))}}.mat-mdc-dialog-inner-container{display:flex;flex-direction:row;align-items:center;justify-content:space-around;box-sizing:border-box;height:100%;opacity:0;transition:opacity linear var(--mat-dialog-transition-duration, 0ms);max-height:inherit;min-height:inherit;min-width:inherit;max-width:inherit}.mdc-dialog--closing .mat-mdc-dialog-inner-container{transition:opacity 75ms linear;transform:none}.mdc-dialog--open .mat-mdc-dialog-inner-container{opacity:1}._mat-animation-noopable .mat-mdc-dialog-inner-container{transition:none}.mat-mdc-dialog-surface{display:flex;flex-direction:column;flex-grow:0;flex-shrink:0;box-sizing:border-box;width:100%;height:100%;position:relative;overflow-y:auto;outline:0;transform:scale(0.8);transition:transform var(--mat-dialog-transition-duration, 0ms) cubic-bezier(0, 0, 0.2, 1);max-height:inherit;min-height:inherit;min-width:inherit;max-width:inherit;box-shadow:var(--mat-dialog-container-elevation-shadow, none);border-radius:var(--mdc-dialog-container-shape, var(--mat-sys-corner-extra-large, 4px));background-color:var(--mdc-dialog-container-color, var(--mat-sys-surface, white))}[dir=rtl] .mat-mdc-dialog-surface{text-align:right}.mdc-dialog--open .mat-mdc-dialog-surface,.mdc-dialog--closing .mat-mdc-dialog-surface{transform:none}._mat-animation-noopable .mat-mdc-dialog-surface{transition:none}.mat-mdc-dialog-surface::before{position:absolute;box-sizing:border-box;width:100%;height:100%;top:0;left:0;border:2px solid rgba(0,0,0,0);border-radius:inherit;content:"";pointer-events:none}.mat-mdc-dialog-title{display:block;position:relative;flex-shrink:0;box-sizing:border-box;margin:0 0 1px;padding:var(--mat-dialog-headline-padding, 6px 24px 13px)}.mat-mdc-dialog-title::before{display:inline-block;width:0;height:40px;content:"";vertical-align:0}[dir=rtl] .mat-mdc-dialog-title{text-align:right}.mat-mdc-dialog-container .mat-mdc-dialog-title{color:var(--mdc-dialog-subhead-color, var(--mat-sys-on-surface, rgba(0, 0, 0, 0.87)));font-family:var(--mdc-dialog-subhead-font, var(--mat-sys-headline-small-font, inherit));line-height:var(--mdc-dialog-subhead-line-height, var(--mat-sys-headline-small-line-height, 1.5rem));font-size:var(--mdc-dialog-subhead-size, var(--mat-sys-headline-small-size, 1rem));font-weight:var(--mdc-dialog-subhead-weight, var(--mat-sys-headline-small-weight, 400));letter-spacing:var(--mdc-dialog-subhead-tracking, var(--mat-sys-headline-small-tracking, 0.03125em))}.mat-mdc-dialog-content{display:block;flex-grow:1;box-sizing:border-box;margin:0;overflow:auto;max-height:65vh}.mat-mdc-dialog-content>:first-child{margin-top:0}.mat-mdc-dialog-content>:last-child{margin-bottom:0}.mat-mdc-dialog-container .mat-mdc-dialog-content{color:var(--mdc-dialog-supporting-text-color, var(--mat-sys-on-surface-variant, rgba(0, 0, 0, 0.6)));font-family:var(--mdc-dialog-supporting-text-font, var(--mat-sys-body-medium-font, inherit));line-height:var(--mdc-dialog-supporting-text-line-height, var(--mat-sys-body-medium-line-height, 1.5rem));font-size:var(--mdc-dialog-supporting-text-size, var(--mat-sys-body-medium-size, 1rem));font-weight:var(--mdc-dialog-supporting-text-weight, var(--mat-sys-body-medium-weight, 400));letter-spacing:var(--mdc-dialog-supporting-text-tracking, var(--mat-sys-body-medium-tracking, 0.03125em))}.mat-mdc-dialog-container .mat-mdc-dialog-content{padding:var(--mat-dialog-content-padding, 20px 24px)}.mat-mdc-dialog-container-with-actions .mat-mdc-dialog-content{padding:var(--mat-dialog-with-actions-content-padding, 20px 24px 0)}.mat-mdc-dialog-container .mat-mdc-dialog-title+.mat-mdc-dialog-content{padding-top:0}.mat-mdc-dialog-actions{display:flex;position:relative;flex-shrink:0;flex-wrap:wrap;align-items:center;justify-content:flex-end;box-sizing:border-box;min-height:52px;margin:0;padding:8px;border-top:1px solid rgba(0,0,0,0);padding:var(--mat-dialog-actions-padding, 16px 24px);justify-content:var(--mat-dialog-actions-alignment, flex-end)}@media(forced-colors: active){.mat-mdc-dialog-actions{border-top-color:CanvasText}}.mat-mdc-dialog-actions.mat-mdc-dialog-actions-align-start,.mat-mdc-dialog-actions[align=start]{justify-content:start}.mat-mdc-dialog-actions.mat-mdc-dialog-actions-align-center,.mat-mdc-dialog-actions[align=center]{justify-content:center}.mat-mdc-dialog-actions.mat-mdc-dialog-actions-align-end,.mat-mdc-dialog-actions[align=end]{justify-content:flex-end}.mat-mdc-dialog-actions .mat-button-base+.mat-button-base,.mat-mdc-dialog-actions .mat-mdc-button-base+.mat-mdc-button-base{margin-left:8px}[dir=rtl] .mat-mdc-dialog-actions .mat-button-base+.mat-button-base,[dir=rtl] .mat-mdc-dialog-actions .mat-mdc-button-base+.mat-mdc-button-base{margin-left:0;margin-right:8px}.mat-mdc-dialog-component-host{display:contents}\n'],
    encapsulation: 2
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MatDialogContainer, [{
    type: Component,
    args: [{
      selector: "mat-dialog-container",
      encapsulation: ViewEncapsulation.None,
      changeDetection: ChangeDetectionStrategy.Default,
      imports: [CdkPortalOutlet],
      host: {
        "class": "mat-mdc-dialog-container mdc-dialog",
        "tabindex": "-1",
        "[attr.aria-modal]": "_config.ariaModal",
        "[id]": "_config.id",
        "[attr.role]": "_config.role",
        "[attr.aria-labelledby]": "_config.ariaLabel ? null : _ariaLabelledByQueue[0]",
        "[attr.aria-label]": "_config.ariaLabel",
        "[attr.aria-describedby]": "_config.ariaDescribedBy || null",
        "[class._mat-animation-noopable]": "!_animationsEnabled",
        "[class.mat-mdc-dialog-container-with-actions]": "_actionSectionCount > 0"
      },
      template: '<div class="mat-mdc-dialog-inner-container mdc-dialog__container">\n  <div class="mat-mdc-dialog-surface mdc-dialog__surface">\n    <ng-template cdkPortalOutlet />\n  </div>\n</div>\n',
      styles: ['.mat-mdc-dialog-container{width:100%;height:100%;display:block;box-sizing:border-box;max-height:inherit;min-height:inherit;min-width:inherit;max-width:inherit;outline:0}.cdk-overlay-pane.mat-mdc-dialog-panel{max-width:var(--mat-dialog-container-max-width, 560px);min-width:var(--mat-dialog-container-min-width, 280px)}@media(max-width: 599px){.cdk-overlay-pane.mat-mdc-dialog-panel{max-width:var(--mat-dialog-container-small-max-width, calc(100vw - 32px))}}.mat-mdc-dialog-inner-container{display:flex;flex-direction:row;align-items:center;justify-content:space-around;box-sizing:border-box;height:100%;opacity:0;transition:opacity linear var(--mat-dialog-transition-duration, 0ms);max-height:inherit;min-height:inherit;min-width:inherit;max-width:inherit}.mdc-dialog--closing .mat-mdc-dialog-inner-container{transition:opacity 75ms linear;transform:none}.mdc-dialog--open .mat-mdc-dialog-inner-container{opacity:1}._mat-animation-noopable .mat-mdc-dialog-inner-container{transition:none}.mat-mdc-dialog-surface{display:flex;flex-direction:column;flex-grow:0;flex-shrink:0;box-sizing:border-box;width:100%;height:100%;position:relative;overflow-y:auto;outline:0;transform:scale(0.8);transition:transform var(--mat-dialog-transition-duration, 0ms) cubic-bezier(0, 0, 0.2, 1);max-height:inherit;min-height:inherit;min-width:inherit;max-width:inherit;box-shadow:var(--mat-dialog-container-elevation-shadow, none);border-radius:var(--mdc-dialog-container-shape, var(--mat-sys-corner-extra-large, 4px));background-color:var(--mdc-dialog-container-color, var(--mat-sys-surface, white))}[dir=rtl] .mat-mdc-dialog-surface{text-align:right}.mdc-dialog--open .mat-mdc-dialog-surface,.mdc-dialog--closing .mat-mdc-dialog-surface{transform:none}._mat-animation-noopable .mat-mdc-dialog-surface{transition:none}.mat-mdc-dialog-surface::before{position:absolute;box-sizing:border-box;width:100%;height:100%;top:0;left:0;border:2px solid rgba(0,0,0,0);border-radius:inherit;content:"";pointer-events:none}.mat-mdc-dialog-title{display:block;position:relative;flex-shrink:0;box-sizing:border-box;margin:0 0 1px;padding:var(--mat-dialog-headline-padding, 6px 24px 13px)}.mat-mdc-dialog-title::before{display:inline-block;width:0;height:40px;content:"";vertical-align:0}[dir=rtl] .mat-mdc-dialog-title{text-align:right}.mat-mdc-dialog-container .mat-mdc-dialog-title{color:var(--mdc-dialog-subhead-color, var(--mat-sys-on-surface, rgba(0, 0, 0, 0.87)));font-family:var(--mdc-dialog-subhead-font, var(--mat-sys-headline-small-font, inherit));line-height:var(--mdc-dialog-subhead-line-height, var(--mat-sys-headline-small-line-height, 1.5rem));font-size:var(--mdc-dialog-subhead-size, var(--mat-sys-headline-small-size, 1rem));font-weight:var(--mdc-dialog-subhead-weight, var(--mat-sys-headline-small-weight, 400));letter-spacing:var(--mdc-dialog-subhead-tracking, var(--mat-sys-headline-small-tracking, 0.03125em))}.mat-mdc-dialog-content{display:block;flex-grow:1;box-sizing:border-box;margin:0;overflow:auto;max-height:65vh}.mat-mdc-dialog-content>:first-child{margin-top:0}.mat-mdc-dialog-content>:last-child{margin-bottom:0}.mat-mdc-dialog-container .mat-mdc-dialog-content{color:var(--mdc-dialog-supporting-text-color, var(--mat-sys-on-surface-variant, rgba(0, 0, 0, 0.6)));font-family:var(--mdc-dialog-supporting-text-font, var(--mat-sys-body-medium-font, inherit));line-height:var(--mdc-dialog-supporting-text-line-height, var(--mat-sys-body-medium-line-height, 1.5rem));font-size:var(--mdc-dialog-supporting-text-size, var(--mat-sys-body-medium-size, 1rem));font-weight:var(--mdc-dialog-supporting-text-weight, var(--mat-sys-body-medium-weight, 400));letter-spacing:var(--mdc-dialog-supporting-text-tracking, var(--mat-sys-body-medium-tracking, 0.03125em))}.mat-mdc-dialog-container .mat-mdc-dialog-content{padding:var(--mat-dialog-content-padding, 20px 24px)}.mat-mdc-dialog-container-with-actions .mat-mdc-dialog-content{padding:var(--mat-dialog-with-actions-content-padding, 20px 24px 0)}.mat-mdc-dialog-container .mat-mdc-dialog-title+.mat-mdc-dialog-content{padding-top:0}.mat-mdc-dialog-actions{display:flex;position:relative;flex-shrink:0;flex-wrap:wrap;align-items:center;justify-content:flex-end;box-sizing:border-box;min-height:52px;margin:0;padding:8px;border-top:1px solid rgba(0,0,0,0);padding:var(--mat-dialog-actions-padding, 16px 24px);justify-content:var(--mat-dialog-actions-alignment, flex-end)}@media(forced-colors: active){.mat-mdc-dialog-actions{border-top-color:CanvasText}}.mat-mdc-dialog-actions.mat-mdc-dialog-actions-align-start,.mat-mdc-dialog-actions[align=start]{justify-content:start}.mat-mdc-dialog-actions.mat-mdc-dialog-actions-align-center,.mat-mdc-dialog-actions[align=center]{justify-content:center}.mat-mdc-dialog-actions.mat-mdc-dialog-actions-align-end,.mat-mdc-dialog-actions[align=end]{justify-content:flex-end}.mat-mdc-dialog-actions .mat-button-base+.mat-button-base,.mat-mdc-dialog-actions .mat-mdc-button-base+.mat-mdc-button-base{margin-left:8px}[dir=rtl] .mat-mdc-dialog-actions .mat-button-base+.mat-button-base,[dir=rtl] .mat-mdc-dialog-actions .mat-mdc-button-base+.mat-mdc-button-base{margin-left:0;margin-right:8px}.mat-mdc-dialog-component-host{display:contents}\n']
    }]
  }], null, null);
})();
var TRANSITION_DURATION_PROPERTY = "--mat-dialog-transition-duration";
function parseCssTime(time) {
  if (time == null) {
    return null;
  }
  if (typeof time === "number") {
    return time;
  }
  if (time.endsWith("ms")) {
    return coerceNumberProperty(time.substring(0, time.length - 2));
  }
  if (time.endsWith("s")) {
    return coerceNumberProperty(time.substring(0, time.length - 1)) * 1e3;
  }
  if (time === "0") {
    return 0;
  }
  return null;
}
var MatDialogState;
(function(MatDialogState2) {
  MatDialogState2[MatDialogState2["OPEN"] = 0] = "OPEN";
  MatDialogState2[MatDialogState2["CLOSING"] = 1] = "CLOSING";
  MatDialogState2[MatDialogState2["CLOSED"] = 2] = "CLOSED";
})(MatDialogState || (MatDialogState = {}));
var MatDialogRef = class {
  _ref;
  _containerInstance;
  /** The instance of component opened into the dialog. */
  componentInstance;
  /**
   * `ComponentRef` of the component opened into the dialog. Will be
   * null when the dialog is opened using a `TemplateRef`.
   */
  componentRef;
  /** Whether the user is allowed to close the dialog. */
  disableClose;
  /** Unique ID for the dialog. */
  id;
  /** Subject for notifying the user that the dialog has finished opening. */
  _afterOpened = new import_rxjs7.Subject();
  /** Subject for notifying the user that the dialog has started closing. */
  _beforeClosed = new import_rxjs7.Subject();
  /** Result to be passed to afterClosed. */
  _result;
  /** Handle to the timeout that's running as a fallback in case the exit animation doesn't fire. */
  _closeFallbackTimeout;
  /** Current state of the dialog. */
  _state = MatDialogState.OPEN;
  // TODO(crisbeto): we shouldn't have to declare this property, because `DialogRef.close`
  // already has a second `options` parameter that we can use. The problem is that internal tests
  // have assertions like `expect(MatDialogRef.close).toHaveBeenCalledWith(foo)` which will break,
  // because it'll be called with two arguments by things like `MatDialogClose`.
  /** Interaction that caused the dialog to close. */
  _closeInteractionType;
  constructor(_ref, config, _containerInstance) {
    this._ref = _ref;
    this._containerInstance = _containerInstance;
    this.disableClose = config.disableClose;
    this.id = _ref.id;
    _ref.addPanelClass("mat-mdc-dialog-panel");
    _containerInstance._animationStateChanged.pipe((0, import_operators5.filter)((event) => event.state === "opened"), (0, import_operators5.take)(1)).subscribe(() => {
      this._afterOpened.next();
      this._afterOpened.complete();
    });
    _containerInstance._animationStateChanged.pipe((0, import_operators5.filter)((event) => event.state === "closed"), (0, import_operators5.take)(1)).subscribe(() => {
      clearTimeout(this._closeFallbackTimeout);
      this._finishDialogClose();
    });
    _ref.overlayRef.detachments().subscribe(() => {
      this._beforeClosed.next(this._result);
      this._beforeClosed.complete();
      this._finishDialogClose();
    });
    (0, import_rxjs7.merge)(this.backdropClick(), this.keydownEvents().pipe((0, import_operators5.filter)((event) => event.keyCode === ESCAPE && !this.disableClose && !hasModifierKey(event)))).subscribe((event) => {
      if (!this.disableClose) {
        event.preventDefault();
        _closeDialogVia(this, event.type === "keydown" ? "keyboard" : "mouse");
      }
    });
  }
  /**
   * Close the dialog.
   * @param dialogResult Optional result to return to the dialog opener.
   */
  close(dialogResult) {
    this._result = dialogResult;
    this._containerInstance._animationStateChanged.pipe((0, import_operators5.filter)((event) => event.state === "closing"), (0, import_operators5.take)(1)).subscribe((event) => {
      this._beforeClosed.next(dialogResult);
      this._beforeClosed.complete();
      this._ref.overlayRef.detachBackdrop();
      this._closeFallbackTimeout = setTimeout(() => this._finishDialogClose(), event.totalTime + 100);
    });
    this._state = MatDialogState.CLOSING;
    this._containerInstance._startExitAnimation();
  }
  /**
   * Gets an observable that is notified when the dialog is finished opening.
   */
  afterOpened() {
    return this._afterOpened;
  }
  /**
   * Gets an observable that is notified when the dialog is finished closing.
   */
  afterClosed() {
    return this._ref.closed;
  }
  /**
   * Gets an observable that is notified when the dialog has started closing.
   */
  beforeClosed() {
    return this._beforeClosed;
  }
  /**
   * Gets an observable that emits when the overlay's backdrop has been clicked.
   */
  backdropClick() {
    return this._ref.backdropClick;
  }
  /**
   * Gets an observable that emits when keydown events are targeted on the overlay.
   */
  keydownEvents() {
    return this._ref.keydownEvents;
  }
  /**
   * Updates the dialog's position.
   * @param position New dialog position.
   */
  updatePosition(position) {
    let strategy = this._ref.config.positionStrategy;
    if (position && (position.left || position.right)) {
      position.left ? strategy.left(position.left) : strategy.right(position.right);
    } else {
      strategy.centerHorizontally();
    }
    if (position && (position.top || position.bottom)) {
      position.top ? strategy.top(position.top) : strategy.bottom(position.bottom);
    } else {
      strategy.centerVertically();
    }
    this._ref.updatePosition();
    return this;
  }
  /**
   * Updates the dialog's width and height.
   * @param width New width of the dialog.
   * @param height New height of the dialog.
   */
  updateSize(width = "", height = "") {
    this._ref.updateSize(width, height);
    return this;
  }
  /** Add a CSS class or an array of classes to the overlay pane. */
  addPanelClass(classes) {
    this._ref.addPanelClass(classes);
    return this;
  }
  /** Remove a CSS class or an array of classes from the overlay pane. */
  removePanelClass(classes) {
    this._ref.removePanelClass(classes);
    return this;
  }
  /** Gets the current state of the dialog's lifecycle. */
  getState() {
    return this._state;
  }
  /**
   * Finishes the dialog close by updating the state of the dialog
   * and disposing the overlay.
   */
  _finishDialogClose() {
    this._state = MatDialogState.CLOSED;
    this._ref.close(this._result, {
      focusOrigin: this._closeInteractionType
    });
    this.componentInstance = null;
  }
};
function _closeDialogVia(ref, interactionType, result) {
  ref._closeInteractionType = interactionType;
  return ref.close(result);
}
var MAT_DIALOG_DATA = new InjectionToken("MatMdcDialogData");
var MAT_DIALOG_DEFAULT_OPTIONS = new InjectionToken("mat-mdc-dialog-default-options");
var MAT_DIALOG_SCROLL_STRATEGY = new InjectionToken("mat-mdc-dialog-scroll-strategy", {
  providedIn: "root",
  factory: () => {
    const overlay = inject(Overlay);
    return () => overlay.scrollStrategies.block();
  }
});
function MAT_DIALOG_SCROLL_STRATEGY_PROVIDER_FACTORY(overlay) {
  return () => overlay.scrollStrategies.block();
}
var MAT_DIALOG_SCROLL_STRATEGY_PROVIDER = {
  provide: MAT_DIALOG_SCROLL_STRATEGY,
  deps: [Overlay],
  useFactory: MAT_DIALOG_SCROLL_STRATEGY_PROVIDER_FACTORY
};
var MatDialog = class _MatDialog {
  _overlay = inject(Overlay);
  _defaultOptions = inject(MAT_DIALOG_DEFAULT_OPTIONS, {
    optional: true
  });
  _scrollStrategy = inject(MAT_DIALOG_SCROLL_STRATEGY);
  _parentDialog = inject(_MatDialog, {
    optional: true,
    skipSelf: true
  });
  _idGenerator = inject(_IdGenerator);
  _dialog = inject(Dialog);
  _openDialogsAtThisLevel = [];
  _afterAllClosedAtThisLevel = new import_rxjs7.Subject();
  _afterOpenedAtThisLevel = new import_rxjs7.Subject();
  dialogConfigClass = MatDialogConfig;
  _dialogRefConstructor;
  _dialogContainerType;
  _dialogDataToken;
  /** Keeps track of the currently-open dialogs. */
  get openDialogs() {
    return this._parentDialog ? this._parentDialog.openDialogs : this._openDialogsAtThisLevel;
  }
  /** Stream that emits when a dialog has been opened. */
  get afterOpened() {
    return this._parentDialog ? this._parentDialog.afterOpened : this._afterOpenedAtThisLevel;
  }
  _getAfterAllClosed() {
    const parent = this._parentDialog;
    return parent ? parent._getAfterAllClosed() : this._afterAllClosedAtThisLevel;
  }
  /**
   * Stream that emits when all open dialog have finished closing.
   * Will emit on subscribe if there are no open dialogs to begin with.
   */
  afterAllClosed = (0, import_rxjs7.defer)(() => this.openDialogs.length ? this._getAfterAllClosed() : this._getAfterAllClosed().pipe((0, import_operators5.startWith)(void 0)));
  constructor() {
    this._dialogRefConstructor = MatDialogRef;
    this._dialogContainerType = MatDialogContainer;
    this._dialogDataToken = MAT_DIALOG_DATA;
  }
  open(componentOrTemplateRef, config) {
    let dialogRef;
    config = __spreadValues(__spreadValues({}, this._defaultOptions || new MatDialogConfig()), config);
    config.id = config.id || this._idGenerator.getId("mat-mdc-dialog-");
    config.scrollStrategy = config.scrollStrategy || this._scrollStrategy();
    const cdkRef = this._dialog.open(componentOrTemplateRef, __spreadProps(__spreadValues({}, config), {
      positionStrategy: this._overlay.position().global().centerHorizontally().centerVertically(),
      // Disable closing since we need to sync it up to the animation ourselves.
      disableClose: true,
      // Disable closing on destroy, because this service cleans up its open dialogs as well.
      // We want to do the cleanup here, rather than the CDK service, because the CDK destroys
      // the dialogs immediately whereas we want it to wait for the animations to finish.
      closeOnDestroy: false,
      // Disable closing on detachments so that we can sync up the animation.
      // The Material dialog ref handles this manually.
      closeOnOverlayDetachments: false,
      container: {
        type: this._dialogContainerType,
        providers: () => [
          // Provide our config as the CDK config as well since it has the same interface as the
          // CDK one, but it contains the actual values passed in by the user for things like
          // `disableClose` which we disable for the CDK dialog since we handle it ourselves.
          {
            provide: this.dialogConfigClass,
            useValue: config
          },
          {
            provide: DialogConfig,
            useValue: config
          }
        ]
      },
      templateContext: () => ({
        dialogRef
      }),
      providers: (ref, cdkConfig, dialogContainer) => {
        dialogRef = new this._dialogRefConstructor(ref, config, dialogContainer);
        dialogRef.updatePosition(config?.position);
        return [{
          provide: this._dialogContainerType,
          useValue: dialogContainer
        }, {
          provide: this._dialogDataToken,
          useValue: cdkConfig.data
        }, {
          provide: this._dialogRefConstructor,
          useValue: dialogRef
        }];
      }
    }));
    dialogRef.componentRef = cdkRef.componentRef;
    dialogRef.componentInstance = cdkRef.componentInstance;
    this.openDialogs.push(dialogRef);
    this.afterOpened.next(dialogRef);
    dialogRef.afterClosed().subscribe(() => {
      const index = this.openDialogs.indexOf(dialogRef);
      if (index > -1) {
        this.openDialogs.splice(index, 1);
        if (!this.openDialogs.length) {
          this._getAfterAllClosed().next();
        }
      }
    });
    return dialogRef;
  }
  /**
   * Closes all of the currently-open dialogs.
   */
  closeAll() {
    this._closeDialogs(this.openDialogs);
  }
  /**
   * Finds an open dialog by its id.
   * @param id ID to use when looking up the dialog.
   */
  getDialogById(id) {
    return this.openDialogs.find((dialog) => dialog.id === id);
  }
  ngOnDestroy() {
    this._closeDialogs(this._openDialogsAtThisLevel);
    this._afterAllClosedAtThisLevel.complete();
    this._afterOpenedAtThisLevel.complete();
  }
  _closeDialogs(dialogs) {
    let i = dialogs.length;
    while (i--) {
      dialogs[i].close();
    }
  }
  static ɵfac = function MatDialog_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _MatDialog)();
  };
  static ɵprov = ɵɵdefineInjectable({
    token: _MatDialog,
    factory: _MatDialog.ɵfac,
    providedIn: "root"
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MatDialog, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], () => [], null);
})();
var MatDialogClose = class _MatDialogClose {
  dialogRef = inject(MatDialogRef, {
    optional: true
  });
  _elementRef = inject(ElementRef);
  _dialog = inject(MatDialog);
  /** Screen-reader label for the button. */
  ariaLabel;
  /** Default to "button" to prevents accidental form submits. */
  type = "button";
  /** Dialog close input. */
  dialogResult;
  _matDialogClose;
  constructor() {
  }
  ngOnInit() {
    if (!this.dialogRef) {
      this.dialogRef = getClosestDialog(this._elementRef, this._dialog.openDialogs);
    }
  }
  ngOnChanges(changes) {
    const proxiedChange = changes["_matDialogClose"] || changes["_matDialogCloseResult"];
    if (proxiedChange) {
      this.dialogResult = proxiedChange.currentValue;
    }
  }
  _onButtonClick(event) {
    _closeDialogVia(this.dialogRef, event.screenX === 0 && event.screenY === 0 ? "keyboard" : "mouse", this.dialogResult);
  }
  static ɵfac = function MatDialogClose_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _MatDialogClose)();
  };
  static ɵdir = ɵɵdefineDirective({
    type: _MatDialogClose,
    selectors: [["", "mat-dialog-close", ""], ["", "matDialogClose", ""]],
    hostVars: 2,
    hostBindings: function MatDialogClose_HostBindings(rf, ctx) {
      if (rf & 1) {
        ɵɵlistener("click", function MatDialogClose_click_HostBindingHandler($event) {
          return ctx._onButtonClick($event);
        });
      }
      if (rf & 2) {
        ɵɵattribute("aria-label", ctx.ariaLabel || null)("type", ctx.type);
      }
    },
    inputs: {
      ariaLabel: [0, "aria-label", "ariaLabel"],
      type: "type",
      dialogResult: [0, "mat-dialog-close", "dialogResult"],
      _matDialogClose: [0, "matDialogClose", "_matDialogClose"]
    },
    exportAs: ["matDialogClose"],
    features: [ɵɵNgOnChangesFeature]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MatDialogClose, [{
    type: Directive,
    args: [{
      selector: "[mat-dialog-close], [matDialogClose]",
      exportAs: "matDialogClose",
      host: {
        "(click)": "_onButtonClick($event)",
        "[attr.aria-label]": "ariaLabel || null",
        "[attr.type]": "type"
      }
    }]
  }], () => [], {
    ariaLabel: [{
      type: Input,
      args: ["aria-label"]
    }],
    type: [{
      type: Input
    }],
    dialogResult: [{
      type: Input,
      args: ["mat-dialog-close"]
    }],
    _matDialogClose: [{
      type: Input,
      args: ["matDialogClose"]
    }]
  });
})();
var MatDialogLayoutSection = class _MatDialogLayoutSection {
  _dialogRef = inject(MatDialogRef, {
    optional: true
  });
  _elementRef = inject(ElementRef);
  _dialog = inject(MatDialog);
  constructor() {
  }
  ngOnInit() {
    if (!this._dialogRef) {
      this._dialogRef = getClosestDialog(this._elementRef, this._dialog.openDialogs);
    }
    if (this._dialogRef) {
      Promise.resolve().then(() => {
        this._onAdd();
      });
    }
  }
  ngOnDestroy() {
    const instance = this._dialogRef?._containerInstance;
    if (instance) {
      Promise.resolve().then(() => {
        this._onRemove();
      });
    }
  }
  static ɵfac = function MatDialogLayoutSection_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _MatDialogLayoutSection)();
  };
  static ɵdir = ɵɵdefineDirective({
    type: _MatDialogLayoutSection
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MatDialogLayoutSection, [{
    type: Directive
  }], () => [], null);
})();
var MatDialogTitle = class _MatDialogTitle extends MatDialogLayoutSection {
  id = inject(_IdGenerator).getId("mat-mdc-dialog-title-");
  _onAdd() {
    this._dialogRef._containerInstance?._addAriaLabelledBy?.(this.id);
  }
  _onRemove() {
    this._dialogRef?._containerInstance?._removeAriaLabelledBy?.(this.id);
  }
  static ɵfac = /* @__PURE__ */ (() => {
    let ɵMatDialogTitle_BaseFactory;
    return function MatDialogTitle_Factory(__ngFactoryType__) {
      return (ɵMatDialogTitle_BaseFactory || (ɵMatDialogTitle_BaseFactory = ɵɵgetInheritedFactory(_MatDialogTitle)))(__ngFactoryType__ || _MatDialogTitle);
    };
  })();
  static ɵdir = ɵɵdefineDirective({
    type: _MatDialogTitle,
    selectors: [["", "mat-dialog-title", ""], ["", "matDialogTitle", ""]],
    hostAttrs: [1, "mat-mdc-dialog-title", "mdc-dialog__title"],
    hostVars: 1,
    hostBindings: function MatDialogTitle_HostBindings(rf, ctx) {
      if (rf & 2) {
        ɵɵhostProperty("id", ctx.id);
      }
    },
    inputs: {
      id: "id"
    },
    exportAs: ["matDialogTitle"],
    features: [ɵɵInheritDefinitionFeature]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MatDialogTitle, [{
    type: Directive,
    args: [{
      selector: "[mat-dialog-title], [matDialogTitle]",
      exportAs: "matDialogTitle",
      host: {
        "class": "mat-mdc-dialog-title mdc-dialog__title",
        "[id]": "id"
      }
    }]
  }], null, {
    id: [{
      type: Input
    }]
  });
})();
var MatDialogContent = class _MatDialogContent {
  static ɵfac = function MatDialogContent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _MatDialogContent)();
  };
  static ɵdir = ɵɵdefineDirective({
    type: _MatDialogContent,
    selectors: [["", "mat-dialog-content", ""], ["mat-dialog-content"], ["", "matDialogContent", ""]],
    hostAttrs: [1, "mat-mdc-dialog-content", "mdc-dialog__content"],
    features: [ɵɵHostDirectivesFeature([CdkScrollable])]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MatDialogContent, [{
    type: Directive,
    args: [{
      selector: `[mat-dialog-content], mat-dialog-content, [matDialogContent]`,
      host: {
        "class": "mat-mdc-dialog-content mdc-dialog__content"
      },
      hostDirectives: [CdkScrollable]
    }]
  }], null, null);
})();
var MatDialogActions = class _MatDialogActions extends MatDialogLayoutSection {
  /**
   * Horizontal alignment of action buttons.
   */
  align;
  _onAdd() {
    this._dialogRef._containerInstance?._updateActionSectionCount?.(1);
  }
  _onRemove() {
    this._dialogRef._containerInstance?._updateActionSectionCount?.(-1);
  }
  static ɵfac = /* @__PURE__ */ (() => {
    let ɵMatDialogActions_BaseFactory;
    return function MatDialogActions_Factory(__ngFactoryType__) {
      return (ɵMatDialogActions_BaseFactory || (ɵMatDialogActions_BaseFactory = ɵɵgetInheritedFactory(_MatDialogActions)))(__ngFactoryType__ || _MatDialogActions);
    };
  })();
  static ɵdir = ɵɵdefineDirective({
    type: _MatDialogActions,
    selectors: [["", "mat-dialog-actions", ""], ["mat-dialog-actions"], ["", "matDialogActions", ""]],
    hostAttrs: [1, "mat-mdc-dialog-actions", "mdc-dialog__actions"],
    hostVars: 6,
    hostBindings: function MatDialogActions_HostBindings(rf, ctx) {
      if (rf & 2) {
        ɵɵclassProp("mat-mdc-dialog-actions-align-start", ctx.align === "start")("mat-mdc-dialog-actions-align-center", ctx.align === "center")("mat-mdc-dialog-actions-align-end", ctx.align === "end");
      }
    },
    inputs: {
      align: "align"
    },
    features: [ɵɵInheritDefinitionFeature]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MatDialogActions, [{
    type: Directive,
    args: [{
      selector: `[mat-dialog-actions], mat-dialog-actions, [matDialogActions]`,
      host: {
        "class": "mat-mdc-dialog-actions mdc-dialog__actions",
        "[class.mat-mdc-dialog-actions-align-start]": 'align === "start"',
        "[class.mat-mdc-dialog-actions-align-center]": 'align === "center"',
        "[class.mat-mdc-dialog-actions-align-end]": 'align === "end"'
      }
    }]
  }], null, {
    align: [{
      type: Input
    }]
  });
})();
function getClosestDialog(element, openDialogs) {
  let parent = element.nativeElement.parentElement;
  while (parent && !parent.classList.contains("mat-mdc-dialog-container")) {
    parent = parent.parentElement;
  }
  return parent ? openDialogs.find((dialog) => dialog.id === parent.id) : null;
}
var DIRECTIVES = [MatDialogContainer, MatDialogClose, MatDialogTitle, MatDialogActions, MatDialogContent];
var MatDialogModule = class _MatDialogModule {
  static ɵfac = function MatDialogModule_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _MatDialogModule)();
  };
  static ɵmod = ɵɵdefineNgModule({
    type: _MatDialogModule,
    imports: [DialogModule, OverlayModule, PortalModule, MatCommonModule, MatDialogContainer, MatDialogClose, MatDialogTitle, MatDialogActions, MatDialogContent],
    exports: [MatCommonModule, MatDialogContainer, MatDialogClose, MatDialogTitle, MatDialogActions, MatDialogContent]
  });
  static ɵinj = ɵɵdefineInjector({
    providers: [MatDialog],
    imports: [DialogModule, OverlayModule, PortalModule, MatCommonModule, MatCommonModule]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MatDialogModule, [{
    type: NgModule,
    args: [{
      imports: [DialogModule, OverlayModule, PortalModule, MatCommonModule, ...DIRECTIVES],
      exports: [MatCommonModule, ...DIRECTIVES],
      providers: [MatDialog]
    }]
  }], null, null);
})();

// node_modules/@angular/material/fesm2022/dialog.mjs
var import_rxjs8 = __toESM(require_cjs(), 1);
var import_operators6 = __toESM(require_operators(), 1);
var _defaultParams = {
  params: {
    enterAnimationDuration: "150ms",
    exitAnimationDuration: "75ms"
  }
};
var matDialogAnimations = {
  // Represents:
  // trigger('dialogContainer', [
  //   // Note: The `enter` animation transitions to `transform: none`, because for some reason
  //   // specifying the transform explicitly, causes IE both to blur the dialog content and
  //   // decimate the animation performance. Leaving it as `none` solves both issues.
  //   state('void, exit', style({opacity: 0, transform: 'scale(0.7)'})),
  //   state('enter', style({transform: 'none'})),
  //   transition(
  //     '* => enter',
  //     group([
  //       animate(
  //         '{{enterAnimationDuration}} cubic-bezier(0, 0, 0.2, 1)',
  //         style({transform: 'none', opacity: 1}),
  //       ),
  //       query('@*', animateChild(), {optional: true}),
  //     ]),
  //     _defaultParams,
  //   ),
  //   transition(
  //     '* => void, * => exit',
  //     group([
  //       animate('{{exitAnimationDuration}} cubic-bezier(0.4, 0.0, 0.2, 1)', style({opacity: 0})),
  //       query('@*', animateChild(), {optional: true}),
  //     ]),
  //     _defaultParams,
  //   ),
  // ])
  /** Animation that is applied on the dialog container by default. */
  dialogContainer: {
    type: 7,
    name: "dialogContainer",
    definitions: [{
      type: 0,
      name: "void, exit",
      styles: {
        type: 6,
        styles: {
          opacity: 0,
          transform: "scale(0.7)"
        },
        offset: null
      }
    }, {
      type: 0,
      name: "enter",
      styles: {
        type: 6,
        styles: {
          transform: "none"
        },
        offset: null
      }
    }, {
      type: 1,
      expr: "* => enter",
      animation: {
        type: 3,
        steps: [{
          type: 4,
          styles: {
            type: 6,
            styles: {
              transform: "none",
              opacity: 1
            },
            offset: null
          },
          timings: "{{enterAnimationDuration}} cubic-bezier(0, 0, 0.2, 1)"
        }, {
          type: 11,
          selector: "@*",
          animation: {
            type: 9,
            options: null
          },
          options: {
            optional: true
          }
        }],
        options: null
      },
      options: {
        params: {
          enterAnimationDuration: "150ms",
          exitAnimationDuration: "75ms"
        }
      }
    }, {
      type: 1,
      expr: "* => void, * => exit",
      animation: {
        type: 3,
        steps: [{
          type: 4,
          styles: {
            type: 6,
            styles: {
              opacity: 0
            },
            offset: null
          },
          timings: "{{exitAnimationDuration}} cubic-bezier(0.4, 0.0, 0.2, 1)"
        }, {
          type: 11,
          selector: "@*",
          animation: {
            type: 9,
            options: null
          },
          options: {
            optional: true
          }
        }],
        options: null
      },
      options: {
        params: {
          enterAnimationDuration: "150ms",
          exitAnimationDuration: "75ms"
        }
      }
    }],
    options: {}
  }
};
export {
  MAT_DIALOG_DATA,
  MAT_DIALOG_DEFAULT_OPTIONS,
  MAT_DIALOG_SCROLL_STRATEGY,
  MAT_DIALOG_SCROLL_STRATEGY_PROVIDER,
  MAT_DIALOG_SCROLL_STRATEGY_PROVIDER_FACTORY,
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogConfig,
  MatDialogContainer,
  MatDialogContent,
  MatDialogModule,
  MatDialogRef,
  MatDialogState,
  MatDialogTitle,
  _closeDialogVia,
  _defaultParams,
  matDialogAnimations
};
//# sourceMappingURL=@angular_material_dialog.js.map
