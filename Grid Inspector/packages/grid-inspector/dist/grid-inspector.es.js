import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import { createRoot } from "react-dom/client";
import { createContext, useState, useEffect, useContext, forwardRef, createElement, useCallback, Component } from "react";
const GridSystemContext = createContext(void 0);
const STORAGE_KEY = "sansys-grid-inspector-v1";
function loadPersistedState() {
  try {
    if (typeof localStorage === "undefined") return null;
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}
function savePersistedState(state) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
  }
}
function GridSystemProvider({
  children,
  initialConfig
}) {
  var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m, _n;
  const ic = initialConfig;
  const persisted = loadPersistedState();
  const [overlay, setOverlayState] = useState({
    columns: ((_a = persisted == null ? void 0 : persisted.overlay) == null ? void 0 : _a.columns) ?? ((_b = ic == null ? void 0 : ic.overlay) == null ? void 0 : _b.columns) ?? 12,
    gutter: ((_c = persisted == null ? void 0 : persisted.overlay) == null ? void 0 : _c.gutter) ?? ((_d = ic == null ? void 0 : ic.overlay) == null ? void 0 : _d.gutter) ?? { x: 16, y: 16 },
    margin: ((_e = persisted == null ? void 0 : persisted.overlay) == null ? void 0 : _e.margin) ?? ((_f = ic == null ? void 0 : ic.overlay) == null ? void 0 : _f.margin) ?? { x: 16, y: 16 },
    padding: ((_g = persisted == null ? void 0 : persisted.overlay) == null ? void 0 : _g.padding) ?? ((_h = ic == null ? void 0 : ic.overlay) == null ? void 0 : _h.padding) ?? { x: 24, y: 24 }
  });
  const [component, setComponentState] = useState({
    gutter: ((_i = persisted == null ? void 0 : persisted.component) == null ? void 0 : _i.gutter) ?? ((_j = ic == null ? void 0 : ic.layout) == null ? void 0 : _j.gutter) ?? { x: 16, y: 16 },
    margin: ((_k = persisted == null ? void 0 : persisted.component) == null ? void 0 : _k.margin) ?? ((_l = ic == null ? void 0 : ic.layout) == null ? void 0 : _l.margin) ?? { x: 0, y: 0 },
    padding: ((_m = persisted == null ? void 0 : persisted.component) == null ? void 0 : _m.padding) ?? ((_n = ic == null ? void 0 : ic.layout) == null ? void 0 : _n.padding) ?? { x: 24, y: 24 }
  });
  const [showGrid, setShowGrid] = useState((persisted == null ? void 0 : persisted.showGrid) ?? true);
  const [autoColumnWidth, setAutoColumnWidth] = useState((persisted == null ? void 0 : persisted.autoColumnWidth) ?? true);
  const [showInspector, setShowInspector] = useState(true);
  const [showRows, setShowRows] = useState(true);
  const [theme, setTheme] = useState("light");
  const [brand, setBrand] = useState((persisted == null ? void 0 : persisted.brand) ?? void 0);
  const [violations, setViolations] = useState([]);
  const [highlightedElementIndex, setHighlightedElementIndex] = useState(null);
  useEffect(() => {
    savePersistedState({ overlay, component, showGrid, autoColumnWidth, brand });
  }, [overlay, component, showGrid, autoColumnWidth, brand]);
  const setOverlay = (config) => {
    setOverlayState((prev) => ({ ...prev, ...config }));
  };
  const setComponent = (config) => {
    setComponentState((prev) => ({ ...prev, ...config }));
  };
  const value = {
    overlay,
    setOverlay,
    component,
    setComponent,
    layout: component,
    showGrid,
    setShowGrid,
    autoColumnWidth,
    setAutoColumnWidth,
    showRows,
    setShowRows,
    theme,
    setTheme,
    brand,
    setBrand,
    showInspector,
    setShowInspector,
    violations,
    setViolations,
    highlightedElementIndex,
    setHighlightedElementIndex
  };
  return /* @__PURE__ */ jsx(GridSystemContext.Provider, { value, children });
}
function useGridSystem() {
  const context = useContext(GridSystemContext);
  if (!context) {
    throw new Error("useGridSystem must be used within a GridSystemProvider");
  }
  return context;
}
const DEFAULT_GRID_CONFIG = {
  columns: 12,
  gutterX: 24,
  gutterY: 24,
  marginX: 48,
  marginY: 48,
  showColumns: true,
  showRows: false,
  showMargins: true,
  showBaseline: false
};
const NestedGridContext = createContext(null);
function NestedGridProvider({ children }) {
  const [selectedElement, setSelectedElement] = useState(null);
  const [isSelectionMode, setIsSelectionMode] = useState(false);
  const [elementGridConfigs, setElementGridConfigs] = useState(/* @__PURE__ */ new Map());
  console.log("[NestedGrid] isSelectionMode:", isSelectionMode, "selectedElement:", selectedElement == null ? void 0 : selectedElement.id);
  const selectedElementInfo = selectedElement ? {
    id: selectedElement.id || "no-id",
    className: selectedElement.className || "no-class",
    tagName: selectedElement.tagName.toLowerCase()
  } : null;
  const selectedGridConfig = (selectedElement == null ? void 0 : selectedElement.id) ? elementGridConfigs.get(selectedElement.id) || DEFAULT_GRID_CONFIG : DEFAULT_GRID_CONFIG;
  const updateSelectedGridConfig = (updates) => {
    if (!(selectedElement == null ? void 0 : selectedElement.id)) {
      console.warn("[NestedGrid] No selected element to update");
      return;
    }
    const currentConfig = elementGridConfigs.get(selectedElement.id) || DEFAULT_GRID_CONFIG;
    const newConfig = { ...currentConfig, ...updates };
    console.log("[NestedGrid] Updating config for", selectedElement.id, "from:", currentConfig, "to:", newConfig);
    const newMap = new Map(elementGridConfigs);
    newMap.set(selectedElement.id, newConfig);
    setElementGridConfigs(newMap);
    applyGridConfigToElement(selectedElement, newConfig);
  };
  return /* @__PURE__ */ jsx(
    NestedGridContext.Provider,
    {
      value: {
        selectedElement,
        setSelectedElement,
        isSelectionMode,
        setIsSelectionMode,
        selectedElementInfo,
        selectedGridConfig,
        updateSelectedGridConfig,
        elementGridConfigs
      },
      children
    }
  );
}
function applyGridConfigToElement(element, config) {
  element.style.setProperty("--element-grid-columns", String(config.columns));
  element.style.setProperty("--element-grid-gutter-x", `${config.gutterX}px`);
  element.style.setProperty("--element-grid-gutter-y", `${config.gutterY}px`);
  element.style.setProperty("--element-grid-margin-x", `${config.marginX}px`);
  element.style.setProperty("--element-grid-margin-y", `${config.marginY}px`);
  element.style.setProperty("--element-grid-show-columns", config.showColumns ? "1" : "0");
  element.style.setProperty("--element-grid-show-rows", config.showRows ? "1" : "0");
  element.style.setProperty("--element-grid-show-margins", config.showMargins ? "1" : "0");
  element.style.setProperty("--element-grid-show-baseline", config.showBaseline ? "1" : "0");
}
function useNestedGrid() {
  const context = useContext(NestedGridContext);
  if (!context) {
    throw new Error("useNestedGrid must be used within NestedGridProvider");
  }
  return context;
}
function r(e) {
  var t, f, n = "";
  if ("string" == typeof e || "number" == typeof e) n += e;
  else if ("object" == typeof e) if (Array.isArray(e)) {
    var o = e.length;
    for (t = 0; t < o; t++) e[t] && (f = r(e[t])) && (n && (n += " "), n += f);
  } else for (f in e) e[f] && (n && (n += " "), n += f);
  return n;
}
function clsx() {
  for (var e, t, f = 0, n = "", o = arguments.length; f < o; f++) (e = arguments[f]) && (t = r(e)) && (n && (n += " "), n += t);
  return n;
}
const CLASS_PART_SEPARATOR = "-";
const createClassGroupUtils = (config) => {
  const classMap = createClassMap(config);
  const {
    conflictingClassGroups,
    conflictingClassGroupModifiers
  } = config;
  const getClassGroupId = (className) => {
    const classParts = className.split(CLASS_PART_SEPARATOR);
    if (classParts[0] === "" && classParts.length !== 1) {
      classParts.shift();
    }
    return getGroupRecursive(classParts, classMap) || getGroupIdForArbitraryProperty(className);
  };
  const getConflictingClassGroupIds = (classGroupId, hasPostfixModifier) => {
    const conflicts = conflictingClassGroups[classGroupId] || [];
    if (hasPostfixModifier && conflictingClassGroupModifiers[classGroupId]) {
      return [...conflicts, ...conflictingClassGroupModifiers[classGroupId]];
    }
    return conflicts;
  };
  return {
    getClassGroupId,
    getConflictingClassGroupIds
  };
};
const getGroupRecursive = (classParts, classPartObject) => {
  var _a;
  if (classParts.length === 0) {
    return classPartObject.classGroupId;
  }
  const currentClassPart = classParts[0];
  const nextClassPartObject = classPartObject.nextPart.get(currentClassPart);
  const classGroupFromNextClassPart = nextClassPartObject ? getGroupRecursive(classParts.slice(1), nextClassPartObject) : void 0;
  if (classGroupFromNextClassPart) {
    return classGroupFromNextClassPart;
  }
  if (classPartObject.validators.length === 0) {
    return void 0;
  }
  const classRest = classParts.join(CLASS_PART_SEPARATOR);
  return (_a = classPartObject.validators.find(({
    validator
  }) => validator(classRest))) == null ? void 0 : _a.classGroupId;
};
const arbitraryPropertyRegex = /^\[(.+)\]$/;
const getGroupIdForArbitraryProperty = (className) => {
  if (arbitraryPropertyRegex.test(className)) {
    const arbitraryPropertyClassName = arbitraryPropertyRegex.exec(className)[1];
    const property = arbitraryPropertyClassName == null ? void 0 : arbitraryPropertyClassName.substring(0, arbitraryPropertyClassName.indexOf(":"));
    if (property) {
      return "arbitrary.." + property;
    }
  }
};
const createClassMap = (config) => {
  const {
    theme,
    prefix
  } = config;
  const classMap = {
    nextPart: /* @__PURE__ */ new Map(),
    validators: []
  };
  const prefixedClassGroupEntries = getPrefixedClassGroupEntries(Object.entries(config.classGroups), prefix);
  prefixedClassGroupEntries.forEach(([classGroupId, classGroup]) => {
    processClassesRecursively(classGroup, classMap, classGroupId, theme);
  });
  return classMap;
};
const processClassesRecursively = (classGroup, classPartObject, classGroupId, theme) => {
  classGroup.forEach((classDefinition) => {
    if (typeof classDefinition === "string") {
      const classPartObjectToEdit = classDefinition === "" ? classPartObject : getPart(classPartObject, classDefinition);
      classPartObjectToEdit.classGroupId = classGroupId;
      return;
    }
    if (typeof classDefinition === "function") {
      if (isThemeGetter(classDefinition)) {
        processClassesRecursively(classDefinition(theme), classPartObject, classGroupId, theme);
        return;
      }
      classPartObject.validators.push({
        validator: classDefinition,
        classGroupId
      });
      return;
    }
    Object.entries(classDefinition).forEach(([key, classGroup2]) => {
      processClassesRecursively(classGroup2, getPart(classPartObject, key), classGroupId, theme);
    });
  });
};
const getPart = (classPartObject, path) => {
  let currentClassPartObject = classPartObject;
  path.split(CLASS_PART_SEPARATOR).forEach((pathPart) => {
    if (!currentClassPartObject.nextPart.has(pathPart)) {
      currentClassPartObject.nextPart.set(pathPart, {
        nextPart: /* @__PURE__ */ new Map(),
        validators: []
      });
    }
    currentClassPartObject = currentClassPartObject.nextPart.get(pathPart);
  });
  return currentClassPartObject;
};
const isThemeGetter = (func) => func.isThemeGetter;
const getPrefixedClassGroupEntries = (classGroupEntries, prefix) => {
  if (!prefix) {
    return classGroupEntries;
  }
  return classGroupEntries.map(([classGroupId, classGroup]) => {
    const prefixedClassGroup = classGroup.map((classDefinition) => {
      if (typeof classDefinition === "string") {
        return prefix + classDefinition;
      }
      if (typeof classDefinition === "object") {
        return Object.fromEntries(Object.entries(classDefinition).map(([key, value]) => [prefix + key, value]));
      }
      return classDefinition;
    });
    return [classGroupId, prefixedClassGroup];
  });
};
const createLruCache = (maxCacheSize) => {
  if (maxCacheSize < 1) {
    return {
      get: () => void 0,
      set: () => {
      }
    };
  }
  let cacheSize = 0;
  let cache = /* @__PURE__ */ new Map();
  let previousCache = /* @__PURE__ */ new Map();
  const update = (key, value) => {
    cache.set(key, value);
    cacheSize++;
    if (cacheSize > maxCacheSize) {
      cacheSize = 0;
      previousCache = cache;
      cache = /* @__PURE__ */ new Map();
    }
  };
  return {
    get(key) {
      let value = cache.get(key);
      if (value !== void 0) {
        return value;
      }
      if ((value = previousCache.get(key)) !== void 0) {
        update(key, value);
        return value;
      }
    },
    set(key, value) {
      if (cache.has(key)) {
        cache.set(key, value);
      } else {
        update(key, value);
      }
    }
  };
};
const IMPORTANT_MODIFIER = "!";
const createParseClassName = (config) => {
  const {
    separator,
    experimentalParseClassName
  } = config;
  const isSeparatorSingleCharacter = separator.length === 1;
  const firstSeparatorCharacter = separator[0];
  const separatorLength = separator.length;
  const parseClassName = (className) => {
    const modifiers = [];
    let bracketDepth = 0;
    let modifierStart = 0;
    let postfixModifierPosition;
    for (let index = 0; index < className.length; index++) {
      let currentCharacter = className[index];
      if (bracketDepth === 0) {
        if (currentCharacter === firstSeparatorCharacter && (isSeparatorSingleCharacter || className.slice(index, index + separatorLength) === separator)) {
          modifiers.push(className.slice(modifierStart, index));
          modifierStart = index + separatorLength;
          continue;
        }
        if (currentCharacter === "/") {
          postfixModifierPosition = index;
          continue;
        }
      }
      if (currentCharacter === "[") {
        bracketDepth++;
      } else if (currentCharacter === "]") {
        bracketDepth--;
      }
    }
    const baseClassNameWithImportantModifier = modifiers.length === 0 ? className : className.substring(modifierStart);
    const hasImportantModifier = baseClassNameWithImportantModifier.startsWith(IMPORTANT_MODIFIER);
    const baseClassName = hasImportantModifier ? baseClassNameWithImportantModifier.substring(1) : baseClassNameWithImportantModifier;
    const maybePostfixModifierPosition = postfixModifierPosition && postfixModifierPosition > modifierStart ? postfixModifierPosition - modifierStart : void 0;
    return {
      modifiers,
      hasImportantModifier,
      baseClassName,
      maybePostfixModifierPosition
    };
  };
  if (experimentalParseClassName) {
    return (className) => experimentalParseClassName({
      className,
      parseClassName
    });
  }
  return parseClassName;
};
const sortModifiers = (modifiers) => {
  if (modifiers.length <= 1) {
    return modifiers;
  }
  const sortedModifiers = [];
  let unsortedModifiers = [];
  modifiers.forEach((modifier) => {
    const isArbitraryVariant = modifier[0] === "[";
    if (isArbitraryVariant) {
      sortedModifiers.push(...unsortedModifiers.sort(), modifier);
      unsortedModifiers = [];
    } else {
      unsortedModifiers.push(modifier);
    }
  });
  sortedModifiers.push(...unsortedModifiers.sort());
  return sortedModifiers;
};
const createConfigUtils = (config) => ({
  cache: createLruCache(config.cacheSize),
  parseClassName: createParseClassName(config),
  ...createClassGroupUtils(config)
});
const SPLIT_CLASSES_REGEX = /\s+/;
const mergeClassList = (classList, configUtils) => {
  const {
    parseClassName,
    getClassGroupId,
    getConflictingClassGroupIds
  } = configUtils;
  const classGroupsInConflict = [];
  const classNames = classList.trim().split(SPLIT_CLASSES_REGEX);
  let result = "";
  for (let index = classNames.length - 1; index >= 0; index -= 1) {
    const originalClassName = classNames[index];
    const {
      modifiers,
      hasImportantModifier,
      baseClassName,
      maybePostfixModifierPosition
    } = parseClassName(originalClassName);
    let hasPostfixModifier = Boolean(maybePostfixModifierPosition);
    let classGroupId = getClassGroupId(hasPostfixModifier ? baseClassName.substring(0, maybePostfixModifierPosition) : baseClassName);
    if (!classGroupId) {
      if (!hasPostfixModifier) {
        result = originalClassName + (result.length > 0 ? " " + result : result);
        continue;
      }
      classGroupId = getClassGroupId(baseClassName);
      if (!classGroupId) {
        result = originalClassName + (result.length > 0 ? " " + result : result);
        continue;
      }
      hasPostfixModifier = false;
    }
    const variantModifier = sortModifiers(modifiers).join(":");
    const modifierId = hasImportantModifier ? variantModifier + IMPORTANT_MODIFIER : variantModifier;
    const classId = modifierId + classGroupId;
    if (classGroupsInConflict.includes(classId)) {
      continue;
    }
    classGroupsInConflict.push(classId);
    const conflictGroups = getConflictingClassGroupIds(classGroupId, hasPostfixModifier);
    for (let i = 0; i < conflictGroups.length; ++i) {
      const group = conflictGroups[i];
      classGroupsInConflict.push(modifierId + group);
    }
    result = originalClassName + (result.length > 0 ? " " + result : result);
  }
  return result;
};
function twJoin() {
  let index = 0;
  let argument;
  let resolvedValue;
  let string = "";
  while (index < arguments.length) {
    if (argument = arguments[index++]) {
      if (resolvedValue = toValue(argument)) {
        string && (string += " ");
        string += resolvedValue;
      }
    }
  }
  return string;
}
const toValue = (mix) => {
  if (typeof mix === "string") {
    return mix;
  }
  let resolvedValue;
  let string = "";
  for (let k = 0; k < mix.length; k++) {
    if (mix[k]) {
      if (resolvedValue = toValue(mix[k])) {
        string && (string += " ");
        string += resolvedValue;
      }
    }
  }
  return string;
};
function createTailwindMerge(createConfigFirst, ...createConfigRest) {
  let configUtils;
  let cacheGet;
  let cacheSet;
  let functionToCall = initTailwindMerge;
  function initTailwindMerge(classList) {
    const config = createConfigRest.reduce((previousConfig, createConfigCurrent) => createConfigCurrent(previousConfig), createConfigFirst());
    configUtils = createConfigUtils(config);
    cacheGet = configUtils.cache.get;
    cacheSet = configUtils.cache.set;
    functionToCall = tailwindMerge;
    return tailwindMerge(classList);
  }
  function tailwindMerge(classList) {
    const cachedResult = cacheGet(classList);
    if (cachedResult) {
      return cachedResult;
    }
    const result = mergeClassList(classList, configUtils);
    cacheSet(classList, result);
    return result;
  }
  return function callTailwindMerge() {
    return functionToCall(twJoin.apply(null, arguments));
  };
}
const fromTheme = (key) => {
  const themeGetter = (theme) => theme[key] || [];
  themeGetter.isThemeGetter = true;
  return themeGetter;
};
const arbitraryValueRegex = /^\[(?:([a-z-]+):)?(.+)\]$/i;
const fractionRegex = /^\d+\/\d+$/;
const stringLengths = /* @__PURE__ */ new Set(["px", "full", "screen"]);
const tshirtUnitRegex = /^(\d+(\.\d+)?)?(xs|sm|md|lg|xl)$/;
const lengthUnitRegex = /\d+(%|px|r?em|[sdl]?v([hwib]|min|max)|pt|pc|in|cm|mm|cap|ch|ex|r?lh|cq(w|h|i|b|min|max))|\b(calc|min|max|clamp)\(.+\)|^0$/;
const colorFunctionRegex = /^(rgba?|hsla?|hwb|(ok)?(lab|lch)|color-mix)\(.+\)$/;
const shadowRegex = /^(inset_)?-?((\d+)?\.?(\d+)[a-z]+|0)_-?((\d+)?\.?(\d+)[a-z]+|0)/;
const imageRegex = /^(url|image|image-set|cross-fade|element|(repeating-)?(linear|radial|conic)-gradient)\(.+\)$/;
const isLength = (value) => isNumber(value) || stringLengths.has(value) || fractionRegex.test(value);
const isArbitraryLength = (value) => getIsArbitraryValue(value, "length", isLengthOnly);
const isNumber = (value) => Boolean(value) && !Number.isNaN(Number(value));
const isArbitraryNumber = (value) => getIsArbitraryValue(value, "number", isNumber);
const isInteger = (value) => Boolean(value) && Number.isInteger(Number(value));
const isPercent = (value) => value.endsWith("%") && isNumber(value.slice(0, -1));
const isArbitraryValue = (value) => arbitraryValueRegex.test(value);
const isTshirtSize = (value) => tshirtUnitRegex.test(value);
const sizeLabels = /* @__PURE__ */ new Set(["length", "size", "percentage"]);
const isArbitrarySize = (value) => getIsArbitraryValue(value, sizeLabels, isNever);
const isArbitraryPosition = (value) => getIsArbitraryValue(value, "position", isNever);
const imageLabels = /* @__PURE__ */ new Set(["image", "url"]);
const isArbitraryImage = (value) => getIsArbitraryValue(value, imageLabels, isImage);
const isArbitraryShadow = (value) => getIsArbitraryValue(value, "", isShadow);
const isAny = () => true;
const getIsArbitraryValue = (value, label, testValue) => {
  const result = arbitraryValueRegex.exec(value);
  if (result) {
    if (result[1]) {
      return typeof label === "string" ? result[1] === label : label.has(result[1]);
    }
    return testValue(result[2]);
  }
  return false;
};
const isLengthOnly = (value) => (
  // `colorFunctionRegex` check is necessary because color functions can have percentages in them which which would be incorrectly classified as lengths.
  // For example, `hsl(0 0% 0%)` would be classified as a length without this check.
  // I could also use lookbehind assertion in `lengthUnitRegex` but that isn't supported widely enough.
  lengthUnitRegex.test(value) && !colorFunctionRegex.test(value)
);
const isNever = () => false;
const isShadow = (value) => shadowRegex.test(value);
const isImage = (value) => imageRegex.test(value);
const getDefaultConfig = () => {
  const colors = fromTheme("colors");
  const spacing = fromTheme("spacing");
  const blur = fromTheme("blur");
  const brightness = fromTheme("brightness");
  const borderColor = fromTheme("borderColor");
  const borderRadius = fromTheme("borderRadius");
  const borderSpacing = fromTheme("borderSpacing");
  const borderWidth = fromTheme("borderWidth");
  const contrast = fromTheme("contrast");
  const grayscale = fromTheme("grayscale");
  const hueRotate = fromTheme("hueRotate");
  const invert = fromTheme("invert");
  const gap = fromTheme("gap");
  const gradientColorStops = fromTheme("gradientColorStops");
  const gradientColorStopPositions = fromTheme("gradientColorStopPositions");
  const inset = fromTheme("inset");
  const margin = fromTheme("margin");
  const opacity = fromTheme("opacity");
  const padding = fromTheme("padding");
  const saturate = fromTheme("saturate");
  const scale = fromTheme("scale");
  const sepia = fromTheme("sepia");
  const skew = fromTheme("skew");
  const space = fromTheme("space");
  const translate = fromTheme("translate");
  const getOverscroll = () => ["auto", "contain", "none"];
  const getOverflow = () => ["auto", "hidden", "clip", "visible", "scroll"];
  const getSpacingWithAutoAndArbitrary = () => ["auto", isArbitraryValue, spacing];
  const getSpacingWithArbitrary = () => [isArbitraryValue, spacing];
  const getLengthWithEmptyAndArbitrary = () => ["", isLength, isArbitraryLength];
  const getNumberWithAutoAndArbitrary = () => ["auto", isNumber, isArbitraryValue];
  const getPositions = () => ["bottom", "center", "left", "left-bottom", "left-top", "right", "right-bottom", "right-top", "top"];
  const getLineStyles = () => ["solid", "dashed", "dotted", "double", "none"];
  const getBlendModes = () => ["normal", "multiply", "screen", "overlay", "darken", "lighten", "color-dodge", "color-burn", "hard-light", "soft-light", "difference", "exclusion", "hue", "saturation", "color", "luminosity"];
  const getAlign = () => ["start", "end", "center", "between", "around", "evenly", "stretch"];
  const getZeroAndEmpty = () => ["", "0", isArbitraryValue];
  const getBreaks = () => ["auto", "avoid", "all", "avoid-page", "page", "left", "right", "column"];
  const getNumberAndArbitrary = () => [isNumber, isArbitraryValue];
  return {
    cacheSize: 500,
    separator: ":",
    theme: {
      colors: [isAny],
      spacing: [isLength, isArbitraryLength],
      blur: ["none", "", isTshirtSize, isArbitraryValue],
      brightness: getNumberAndArbitrary(),
      borderColor: [colors],
      borderRadius: ["none", "", "full", isTshirtSize, isArbitraryValue],
      borderSpacing: getSpacingWithArbitrary(),
      borderWidth: getLengthWithEmptyAndArbitrary(),
      contrast: getNumberAndArbitrary(),
      grayscale: getZeroAndEmpty(),
      hueRotate: getNumberAndArbitrary(),
      invert: getZeroAndEmpty(),
      gap: getSpacingWithArbitrary(),
      gradientColorStops: [colors],
      gradientColorStopPositions: [isPercent, isArbitraryLength],
      inset: getSpacingWithAutoAndArbitrary(),
      margin: getSpacingWithAutoAndArbitrary(),
      opacity: getNumberAndArbitrary(),
      padding: getSpacingWithArbitrary(),
      saturate: getNumberAndArbitrary(),
      scale: getNumberAndArbitrary(),
      sepia: getZeroAndEmpty(),
      skew: getNumberAndArbitrary(),
      space: getSpacingWithArbitrary(),
      translate: getSpacingWithArbitrary()
    },
    classGroups: {
      // Layout
      /**
       * Aspect Ratio
       * @see https://tailwindcss.com/docs/aspect-ratio
       */
      aspect: [{
        aspect: ["auto", "square", "video", isArbitraryValue]
      }],
      /**
       * Container
       * @see https://tailwindcss.com/docs/container
       */
      container: ["container"],
      /**
       * Columns
       * @see https://tailwindcss.com/docs/columns
       */
      columns: [{
        columns: [isTshirtSize]
      }],
      /**
       * Break After
       * @see https://tailwindcss.com/docs/break-after
       */
      "break-after": [{
        "break-after": getBreaks()
      }],
      /**
       * Break Before
       * @see https://tailwindcss.com/docs/break-before
       */
      "break-before": [{
        "break-before": getBreaks()
      }],
      /**
       * Break Inside
       * @see https://tailwindcss.com/docs/break-inside
       */
      "break-inside": [{
        "break-inside": ["auto", "avoid", "avoid-page", "avoid-column"]
      }],
      /**
       * Box Decoration Break
       * @see https://tailwindcss.com/docs/box-decoration-break
       */
      "box-decoration": [{
        "box-decoration": ["slice", "clone"]
      }],
      /**
       * Box Sizing
       * @see https://tailwindcss.com/docs/box-sizing
       */
      box: [{
        box: ["border", "content"]
      }],
      /**
       * Display
       * @see https://tailwindcss.com/docs/display
       */
      display: ["block", "inline-block", "inline", "flex", "inline-flex", "table", "inline-table", "table-caption", "table-cell", "table-column", "table-column-group", "table-footer-group", "table-header-group", "table-row-group", "table-row", "flow-root", "grid", "inline-grid", "contents", "list-item", "hidden"],
      /**
       * Floats
       * @see https://tailwindcss.com/docs/float
       */
      float: [{
        float: ["right", "left", "none", "start", "end"]
      }],
      /**
       * Clear
       * @see https://tailwindcss.com/docs/clear
       */
      clear: [{
        clear: ["left", "right", "both", "none", "start", "end"]
      }],
      /**
       * Isolation
       * @see https://tailwindcss.com/docs/isolation
       */
      isolation: ["isolate", "isolation-auto"],
      /**
       * Object Fit
       * @see https://tailwindcss.com/docs/object-fit
       */
      "object-fit": [{
        object: ["contain", "cover", "fill", "none", "scale-down"]
      }],
      /**
       * Object Position
       * @see https://tailwindcss.com/docs/object-position
       */
      "object-position": [{
        object: [...getPositions(), isArbitraryValue]
      }],
      /**
       * Overflow
       * @see https://tailwindcss.com/docs/overflow
       */
      overflow: [{
        overflow: getOverflow()
      }],
      /**
       * Overflow X
       * @see https://tailwindcss.com/docs/overflow
       */
      "overflow-x": [{
        "overflow-x": getOverflow()
      }],
      /**
       * Overflow Y
       * @see https://tailwindcss.com/docs/overflow
       */
      "overflow-y": [{
        "overflow-y": getOverflow()
      }],
      /**
       * Overscroll Behavior
       * @see https://tailwindcss.com/docs/overscroll-behavior
       */
      overscroll: [{
        overscroll: getOverscroll()
      }],
      /**
       * Overscroll Behavior X
       * @see https://tailwindcss.com/docs/overscroll-behavior
       */
      "overscroll-x": [{
        "overscroll-x": getOverscroll()
      }],
      /**
       * Overscroll Behavior Y
       * @see https://tailwindcss.com/docs/overscroll-behavior
       */
      "overscroll-y": [{
        "overscroll-y": getOverscroll()
      }],
      /**
       * Position
       * @see https://tailwindcss.com/docs/position
       */
      position: ["static", "fixed", "absolute", "relative", "sticky"],
      /**
       * Top / Right / Bottom / Left
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      inset: [{
        inset: [inset]
      }],
      /**
       * Right / Left
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      "inset-x": [{
        "inset-x": [inset]
      }],
      /**
       * Top / Bottom
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      "inset-y": [{
        "inset-y": [inset]
      }],
      /**
       * Start
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      start: [{
        start: [inset]
      }],
      /**
       * End
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      end: [{
        end: [inset]
      }],
      /**
       * Top
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      top: [{
        top: [inset]
      }],
      /**
       * Right
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      right: [{
        right: [inset]
      }],
      /**
       * Bottom
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      bottom: [{
        bottom: [inset]
      }],
      /**
       * Left
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      left: [{
        left: [inset]
      }],
      /**
       * Visibility
       * @see https://tailwindcss.com/docs/visibility
       */
      visibility: ["visible", "invisible", "collapse"],
      /**
       * Z-Index
       * @see https://tailwindcss.com/docs/z-index
       */
      z: [{
        z: ["auto", isInteger, isArbitraryValue]
      }],
      // Flexbox and Grid
      /**
       * Flex Basis
       * @see https://tailwindcss.com/docs/flex-basis
       */
      basis: [{
        basis: getSpacingWithAutoAndArbitrary()
      }],
      /**
       * Flex Direction
       * @see https://tailwindcss.com/docs/flex-direction
       */
      "flex-direction": [{
        flex: ["row", "row-reverse", "col", "col-reverse"]
      }],
      /**
       * Flex Wrap
       * @see https://tailwindcss.com/docs/flex-wrap
       */
      "flex-wrap": [{
        flex: ["wrap", "wrap-reverse", "nowrap"]
      }],
      /**
       * Flex
       * @see https://tailwindcss.com/docs/flex
       */
      flex: [{
        flex: ["1", "auto", "initial", "none", isArbitraryValue]
      }],
      /**
       * Flex Grow
       * @see https://tailwindcss.com/docs/flex-grow
       */
      grow: [{
        grow: getZeroAndEmpty()
      }],
      /**
       * Flex Shrink
       * @see https://tailwindcss.com/docs/flex-shrink
       */
      shrink: [{
        shrink: getZeroAndEmpty()
      }],
      /**
       * Order
       * @see https://tailwindcss.com/docs/order
       */
      order: [{
        order: ["first", "last", "none", isInteger, isArbitraryValue]
      }],
      /**
       * Grid Template Columns
       * @see https://tailwindcss.com/docs/grid-template-columns
       */
      "grid-cols": [{
        "grid-cols": [isAny]
      }],
      /**
       * Grid Column Start / End
       * @see https://tailwindcss.com/docs/grid-column
       */
      "col-start-end": [{
        col: ["auto", {
          span: ["full", isInteger, isArbitraryValue]
        }, isArbitraryValue]
      }],
      /**
       * Grid Column Start
       * @see https://tailwindcss.com/docs/grid-column
       */
      "col-start": [{
        "col-start": getNumberWithAutoAndArbitrary()
      }],
      /**
       * Grid Column End
       * @see https://tailwindcss.com/docs/grid-column
       */
      "col-end": [{
        "col-end": getNumberWithAutoAndArbitrary()
      }],
      /**
       * Grid Template Rows
       * @see https://tailwindcss.com/docs/grid-template-rows
       */
      "grid-rows": [{
        "grid-rows": [isAny]
      }],
      /**
       * Grid Row Start / End
       * @see https://tailwindcss.com/docs/grid-row
       */
      "row-start-end": [{
        row: ["auto", {
          span: [isInteger, isArbitraryValue]
        }, isArbitraryValue]
      }],
      /**
       * Grid Row Start
       * @see https://tailwindcss.com/docs/grid-row
       */
      "row-start": [{
        "row-start": getNumberWithAutoAndArbitrary()
      }],
      /**
       * Grid Row End
       * @see https://tailwindcss.com/docs/grid-row
       */
      "row-end": [{
        "row-end": getNumberWithAutoAndArbitrary()
      }],
      /**
       * Grid Auto Flow
       * @see https://tailwindcss.com/docs/grid-auto-flow
       */
      "grid-flow": [{
        "grid-flow": ["row", "col", "dense", "row-dense", "col-dense"]
      }],
      /**
       * Grid Auto Columns
       * @see https://tailwindcss.com/docs/grid-auto-columns
       */
      "auto-cols": [{
        "auto-cols": ["auto", "min", "max", "fr", isArbitraryValue]
      }],
      /**
       * Grid Auto Rows
       * @see https://tailwindcss.com/docs/grid-auto-rows
       */
      "auto-rows": [{
        "auto-rows": ["auto", "min", "max", "fr", isArbitraryValue]
      }],
      /**
       * Gap
       * @see https://tailwindcss.com/docs/gap
       */
      gap: [{
        gap: [gap]
      }],
      /**
       * Gap X
       * @see https://tailwindcss.com/docs/gap
       */
      "gap-x": [{
        "gap-x": [gap]
      }],
      /**
       * Gap Y
       * @see https://tailwindcss.com/docs/gap
       */
      "gap-y": [{
        "gap-y": [gap]
      }],
      /**
       * Justify Content
       * @see https://tailwindcss.com/docs/justify-content
       */
      "justify-content": [{
        justify: ["normal", ...getAlign()]
      }],
      /**
       * Justify Items
       * @see https://tailwindcss.com/docs/justify-items
       */
      "justify-items": [{
        "justify-items": ["start", "end", "center", "stretch"]
      }],
      /**
       * Justify Self
       * @see https://tailwindcss.com/docs/justify-self
       */
      "justify-self": [{
        "justify-self": ["auto", "start", "end", "center", "stretch"]
      }],
      /**
       * Align Content
       * @see https://tailwindcss.com/docs/align-content
       */
      "align-content": [{
        content: ["normal", ...getAlign(), "baseline"]
      }],
      /**
       * Align Items
       * @see https://tailwindcss.com/docs/align-items
       */
      "align-items": [{
        items: ["start", "end", "center", "baseline", "stretch"]
      }],
      /**
       * Align Self
       * @see https://tailwindcss.com/docs/align-self
       */
      "align-self": [{
        self: ["auto", "start", "end", "center", "stretch", "baseline"]
      }],
      /**
       * Place Content
       * @see https://tailwindcss.com/docs/place-content
       */
      "place-content": [{
        "place-content": [...getAlign(), "baseline"]
      }],
      /**
       * Place Items
       * @see https://tailwindcss.com/docs/place-items
       */
      "place-items": [{
        "place-items": ["start", "end", "center", "baseline", "stretch"]
      }],
      /**
       * Place Self
       * @see https://tailwindcss.com/docs/place-self
       */
      "place-self": [{
        "place-self": ["auto", "start", "end", "center", "stretch"]
      }],
      // Spacing
      /**
       * Padding
       * @see https://tailwindcss.com/docs/padding
       */
      p: [{
        p: [padding]
      }],
      /**
       * Padding X
       * @see https://tailwindcss.com/docs/padding
       */
      px: [{
        px: [padding]
      }],
      /**
       * Padding Y
       * @see https://tailwindcss.com/docs/padding
       */
      py: [{
        py: [padding]
      }],
      /**
       * Padding Start
       * @see https://tailwindcss.com/docs/padding
       */
      ps: [{
        ps: [padding]
      }],
      /**
       * Padding End
       * @see https://tailwindcss.com/docs/padding
       */
      pe: [{
        pe: [padding]
      }],
      /**
       * Padding Top
       * @see https://tailwindcss.com/docs/padding
       */
      pt: [{
        pt: [padding]
      }],
      /**
       * Padding Right
       * @see https://tailwindcss.com/docs/padding
       */
      pr: [{
        pr: [padding]
      }],
      /**
       * Padding Bottom
       * @see https://tailwindcss.com/docs/padding
       */
      pb: [{
        pb: [padding]
      }],
      /**
       * Padding Left
       * @see https://tailwindcss.com/docs/padding
       */
      pl: [{
        pl: [padding]
      }],
      /**
       * Margin
       * @see https://tailwindcss.com/docs/margin
       */
      m: [{
        m: [margin]
      }],
      /**
       * Margin X
       * @see https://tailwindcss.com/docs/margin
       */
      mx: [{
        mx: [margin]
      }],
      /**
       * Margin Y
       * @see https://tailwindcss.com/docs/margin
       */
      my: [{
        my: [margin]
      }],
      /**
       * Margin Start
       * @see https://tailwindcss.com/docs/margin
       */
      ms: [{
        ms: [margin]
      }],
      /**
       * Margin End
       * @see https://tailwindcss.com/docs/margin
       */
      me: [{
        me: [margin]
      }],
      /**
       * Margin Top
       * @see https://tailwindcss.com/docs/margin
       */
      mt: [{
        mt: [margin]
      }],
      /**
       * Margin Right
       * @see https://tailwindcss.com/docs/margin
       */
      mr: [{
        mr: [margin]
      }],
      /**
       * Margin Bottom
       * @see https://tailwindcss.com/docs/margin
       */
      mb: [{
        mb: [margin]
      }],
      /**
       * Margin Left
       * @see https://tailwindcss.com/docs/margin
       */
      ml: [{
        ml: [margin]
      }],
      /**
       * Space Between X
       * @see https://tailwindcss.com/docs/space
       */
      "space-x": [{
        "space-x": [space]
      }],
      /**
       * Space Between X Reverse
       * @see https://tailwindcss.com/docs/space
       */
      "space-x-reverse": ["space-x-reverse"],
      /**
       * Space Between Y
       * @see https://tailwindcss.com/docs/space
       */
      "space-y": [{
        "space-y": [space]
      }],
      /**
       * Space Between Y Reverse
       * @see https://tailwindcss.com/docs/space
       */
      "space-y-reverse": ["space-y-reverse"],
      // Sizing
      /**
       * Width
       * @see https://tailwindcss.com/docs/width
       */
      w: [{
        w: ["auto", "min", "max", "fit", "svw", "lvw", "dvw", isArbitraryValue, spacing]
      }],
      /**
       * Min-Width
       * @see https://tailwindcss.com/docs/min-width
       */
      "min-w": [{
        "min-w": [isArbitraryValue, spacing, "min", "max", "fit"]
      }],
      /**
       * Max-Width
       * @see https://tailwindcss.com/docs/max-width
       */
      "max-w": [{
        "max-w": [isArbitraryValue, spacing, "none", "full", "min", "max", "fit", "prose", {
          screen: [isTshirtSize]
        }, isTshirtSize]
      }],
      /**
       * Height
       * @see https://tailwindcss.com/docs/height
       */
      h: [{
        h: [isArbitraryValue, spacing, "auto", "min", "max", "fit", "svh", "lvh", "dvh"]
      }],
      /**
       * Min-Height
       * @see https://tailwindcss.com/docs/min-height
       */
      "min-h": [{
        "min-h": [isArbitraryValue, spacing, "min", "max", "fit", "svh", "lvh", "dvh"]
      }],
      /**
       * Max-Height
       * @see https://tailwindcss.com/docs/max-height
       */
      "max-h": [{
        "max-h": [isArbitraryValue, spacing, "min", "max", "fit", "svh", "lvh", "dvh"]
      }],
      /**
       * Size
       * @see https://tailwindcss.com/docs/size
       */
      size: [{
        size: [isArbitraryValue, spacing, "auto", "min", "max", "fit"]
      }],
      // Typography
      /**
       * Font Size
       * @see https://tailwindcss.com/docs/font-size
       */
      "font-size": [{
        text: ["base", isTshirtSize, isArbitraryLength]
      }],
      /**
       * Font Smoothing
       * @see https://tailwindcss.com/docs/font-smoothing
       */
      "font-smoothing": ["antialiased", "subpixel-antialiased"],
      /**
       * Font Style
       * @see https://tailwindcss.com/docs/font-style
       */
      "font-style": ["italic", "not-italic"],
      /**
       * Font Weight
       * @see https://tailwindcss.com/docs/font-weight
       */
      "font-weight": [{
        font: ["thin", "extralight", "light", "normal", "medium", "semibold", "bold", "extrabold", "black", isArbitraryNumber]
      }],
      /**
       * Font Family
       * @see https://tailwindcss.com/docs/font-family
       */
      "font-family": [{
        font: [isAny]
      }],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      "fvn-normal": ["normal-nums"],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      "fvn-ordinal": ["ordinal"],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      "fvn-slashed-zero": ["slashed-zero"],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      "fvn-figure": ["lining-nums", "oldstyle-nums"],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      "fvn-spacing": ["proportional-nums", "tabular-nums"],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      "fvn-fraction": ["diagonal-fractions", "stacked-fractions"],
      /**
       * Letter Spacing
       * @see https://tailwindcss.com/docs/letter-spacing
       */
      tracking: [{
        tracking: ["tighter", "tight", "normal", "wide", "wider", "widest", isArbitraryValue]
      }],
      /**
       * Line Clamp
       * @see https://tailwindcss.com/docs/line-clamp
       */
      "line-clamp": [{
        "line-clamp": ["none", isNumber, isArbitraryNumber]
      }],
      /**
       * Line Height
       * @see https://tailwindcss.com/docs/line-height
       */
      leading: [{
        leading: ["none", "tight", "snug", "normal", "relaxed", "loose", isLength, isArbitraryValue]
      }],
      /**
       * List Style Image
       * @see https://tailwindcss.com/docs/list-style-image
       */
      "list-image": [{
        "list-image": ["none", isArbitraryValue]
      }],
      /**
       * List Style Type
       * @see https://tailwindcss.com/docs/list-style-type
       */
      "list-style-type": [{
        list: ["none", "disc", "decimal", isArbitraryValue]
      }],
      /**
       * List Style Position
       * @see https://tailwindcss.com/docs/list-style-position
       */
      "list-style-position": [{
        list: ["inside", "outside"]
      }],
      /**
       * Placeholder Color
       * @deprecated since Tailwind CSS v3.0.0
       * @see https://tailwindcss.com/docs/placeholder-color
       */
      "placeholder-color": [{
        placeholder: [colors]
      }],
      /**
       * Placeholder Opacity
       * @see https://tailwindcss.com/docs/placeholder-opacity
       */
      "placeholder-opacity": [{
        "placeholder-opacity": [opacity]
      }],
      /**
       * Text Alignment
       * @see https://tailwindcss.com/docs/text-align
       */
      "text-alignment": [{
        text: ["left", "center", "right", "justify", "start", "end"]
      }],
      /**
       * Text Color
       * @see https://tailwindcss.com/docs/text-color
       */
      "text-color": [{
        text: [colors]
      }],
      /**
       * Text Opacity
       * @see https://tailwindcss.com/docs/text-opacity
       */
      "text-opacity": [{
        "text-opacity": [opacity]
      }],
      /**
       * Text Decoration
       * @see https://tailwindcss.com/docs/text-decoration
       */
      "text-decoration": ["underline", "overline", "line-through", "no-underline"],
      /**
       * Text Decoration Style
       * @see https://tailwindcss.com/docs/text-decoration-style
       */
      "text-decoration-style": [{
        decoration: [...getLineStyles(), "wavy"]
      }],
      /**
       * Text Decoration Thickness
       * @see https://tailwindcss.com/docs/text-decoration-thickness
       */
      "text-decoration-thickness": [{
        decoration: ["auto", "from-font", isLength, isArbitraryLength]
      }],
      /**
       * Text Underline Offset
       * @see https://tailwindcss.com/docs/text-underline-offset
       */
      "underline-offset": [{
        "underline-offset": ["auto", isLength, isArbitraryValue]
      }],
      /**
       * Text Decoration Color
       * @see https://tailwindcss.com/docs/text-decoration-color
       */
      "text-decoration-color": [{
        decoration: [colors]
      }],
      /**
       * Text Transform
       * @see https://tailwindcss.com/docs/text-transform
       */
      "text-transform": ["uppercase", "lowercase", "capitalize", "normal-case"],
      /**
       * Text Overflow
       * @see https://tailwindcss.com/docs/text-overflow
       */
      "text-overflow": ["truncate", "text-ellipsis", "text-clip"],
      /**
       * Text Wrap
       * @see https://tailwindcss.com/docs/text-wrap
       */
      "text-wrap": [{
        text: ["wrap", "nowrap", "balance", "pretty"]
      }],
      /**
       * Text Indent
       * @see https://tailwindcss.com/docs/text-indent
       */
      indent: [{
        indent: getSpacingWithArbitrary()
      }],
      /**
       * Vertical Alignment
       * @see https://tailwindcss.com/docs/vertical-align
       */
      "vertical-align": [{
        align: ["baseline", "top", "middle", "bottom", "text-top", "text-bottom", "sub", "super", isArbitraryValue]
      }],
      /**
       * Whitespace
       * @see https://tailwindcss.com/docs/whitespace
       */
      whitespace: [{
        whitespace: ["normal", "nowrap", "pre", "pre-line", "pre-wrap", "break-spaces"]
      }],
      /**
       * Word Break
       * @see https://tailwindcss.com/docs/word-break
       */
      break: [{
        break: ["normal", "words", "all", "keep"]
      }],
      /**
       * Hyphens
       * @see https://tailwindcss.com/docs/hyphens
       */
      hyphens: [{
        hyphens: ["none", "manual", "auto"]
      }],
      /**
       * Content
       * @see https://tailwindcss.com/docs/content
       */
      content: [{
        content: ["none", isArbitraryValue]
      }],
      // Backgrounds
      /**
       * Background Attachment
       * @see https://tailwindcss.com/docs/background-attachment
       */
      "bg-attachment": [{
        bg: ["fixed", "local", "scroll"]
      }],
      /**
       * Background Clip
       * @see https://tailwindcss.com/docs/background-clip
       */
      "bg-clip": [{
        "bg-clip": ["border", "padding", "content", "text"]
      }],
      /**
       * Background Opacity
       * @deprecated since Tailwind CSS v3.0.0
       * @see https://tailwindcss.com/docs/background-opacity
       */
      "bg-opacity": [{
        "bg-opacity": [opacity]
      }],
      /**
       * Background Origin
       * @see https://tailwindcss.com/docs/background-origin
       */
      "bg-origin": [{
        "bg-origin": ["border", "padding", "content"]
      }],
      /**
       * Background Position
       * @see https://tailwindcss.com/docs/background-position
       */
      "bg-position": [{
        bg: [...getPositions(), isArbitraryPosition]
      }],
      /**
       * Background Repeat
       * @see https://tailwindcss.com/docs/background-repeat
       */
      "bg-repeat": [{
        bg: ["no-repeat", {
          repeat: ["", "x", "y", "round", "space"]
        }]
      }],
      /**
       * Background Size
       * @see https://tailwindcss.com/docs/background-size
       */
      "bg-size": [{
        bg: ["auto", "cover", "contain", isArbitrarySize]
      }],
      /**
       * Background Image
       * @see https://tailwindcss.com/docs/background-image
       */
      "bg-image": [{
        bg: ["none", {
          "gradient-to": ["t", "tr", "r", "br", "b", "bl", "l", "tl"]
        }, isArbitraryImage]
      }],
      /**
       * Background Color
       * @see https://tailwindcss.com/docs/background-color
       */
      "bg-color": [{
        bg: [colors]
      }],
      /**
       * Gradient Color Stops From Position
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-from-pos": [{
        from: [gradientColorStopPositions]
      }],
      /**
       * Gradient Color Stops Via Position
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-via-pos": [{
        via: [gradientColorStopPositions]
      }],
      /**
       * Gradient Color Stops To Position
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-to-pos": [{
        to: [gradientColorStopPositions]
      }],
      /**
       * Gradient Color Stops From
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-from": [{
        from: [gradientColorStops]
      }],
      /**
       * Gradient Color Stops Via
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-via": [{
        via: [gradientColorStops]
      }],
      /**
       * Gradient Color Stops To
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-to": [{
        to: [gradientColorStops]
      }],
      // Borders
      /**
       * Border Radius
       * @see https://tailwindcss.com/docs/border-radius
       */
      rounded: [{
        rounded: [borderRadius]
      }],
      /**
       * Border Radius Start
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-s": [{
        "rounded-s": [borderRadius]
      }],
      /**
       * Border Radius End
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-e": [{
        "rounded-e": [borderRadius]
      }],
      /**
       * Border Radius Top
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-t": [{
        "rounded-t": [borderRadius]
      }],
      /**
       * Border Radius Right
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-r": [{
        "rounded-r": [borderRadius]
      }],
      /**
       * Border Radius Bottom
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-b": [{
        "rounded-b": [borderRadius]
      }],
      /**
       * Border Radius Left
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-l": [{
        "rounded-l": [borderRadius]
      }],
      /**
       * Border Radius Start Start
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-ss": [{
        "rounded-ss": [borderRadius]
      }],
      /**
       * Border Radius Start End
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-se": [{
        "rounded-se": [borderRadius]
      }],
      /**
       * Border Radius End End
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-ee": [{
        "rounded-ee": [borderRadius]
      }],
      /**
       * Border Radius End Start
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-es": [{
        "rounded-es": [borderRadius]
      }],
      /**
       * Border Radius Top Left
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-tl": [{
        "rounded-tl": [borderRadius]
      }],
      /**
       * Border Radius Top Right
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-tr": [{
        "rounded-tr": [borderRadius]
      }],
      /**
       * Border Radius Bottom Right
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-br": [{
        "rounded-br": [borderRadius]
      }],
      /**
       * Border Radius Bottom Left
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-bl": [{
        "rounded-bl": [borderRadius]
      }],
      /**
       * Border Width
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w": [{
        border: [borderWidth]
      }],
      /**
       * Border Width X
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-x": [{
        "border-x": [borderWidth]
      }],
      /**
       * Border Width Y
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-y": [{
        "border-y": [borderWidth]
      }],
      /**
       * Border Width Start
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-s": [{
        "border-s": [borderWidth]
      }],
      /**
       * Border Width End
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-e": [{
        "border-e": [borderWidth]
      }],
      /**
       * Border Width Top
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-t": [{
        "border-t": [borderWidth]
      }],
      /**
       * Border Width Right
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-r": [{
        "border-r": [borderWidth]
      }],
      /**
       * Border Width Bottom
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-b": [{
        "border-b": [borderWidth]
      }],
      /**
       * Border Width Left
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-l": [{
        "border-l": [borderWidth]
      }],
      /**
       * Border Opacity
       * @see https://tailwindcss.com/docs/border-opacity
       */
      "border-opacity": [{
        "border-opacity": [opacity]
      }],
      /**
       * Border Style
       * @see https://tailwindcss.com/docs/border-style
       */
      "border-style": [{
        border: [...getLineStyles(), "hidden"]
      }],
      /**
       * Divide Width X
       * @see https://tailwindcss.com/docs/divide-width
       */
      "divide-x": [{
        "divide-x": [borderWidth]
      }],
      /**
       * Divide Width X Reverse
       * @see https://tailwindcss.com/docs/divide-width
       */
      "divide-x-reverse": ["divide-x-reverse"],
      /**
       * Divide Width Y
       * @see https://tailwindcss.com/docs/divide-width
       */
      "divide-y": [{
        "divide-y": [borderWidth]
      }],
      /**
       * Divide Width Y Reverse
       * @see https://tailwindcss.com/docs/divide-width
       */
      "divide-y-reverse": ["divide-y-reverse"],
      /**
       * Divide Opacity
       * @see https://tailwindcss.com/docs/divide-opacity
       */
      "divide-opacity": [{
        "divide-opacity": [opacity]
      }],
      /**
       * Divide Style
       * @see https://tailwindcss.com/docs/divide-style
       */
      "divide-style": [{
        divide: getLineStyles()
      }],
      /**
       * Border Color
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color": [{
        border: [borderColor]
      }],
      /**
       * Border Color X
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-x": [{
        "border-x": [borderColor]
      }],
      /**
       * Border Color Y
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-y": [{
        "border-y": [borderColor]
      }],
      /**
       * Border Color S
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-s": [{
        "border-s": [borderColor]
      }],
      /**
       * Border Color E
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-e": [{
        "border-e": [borderColor]
      }],
      /**
       * Border Color Top
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-t": [{
        "border-t": [borderColor]
      }],
      /**
       * Border Color Right
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-r": [{
        "border-r": [borderColor]
      }],
      /**
       * Border Color Bottom
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-b": [{
        "border-b": [borderColor]
      }],
      /**
       * Border Color Left
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-l": [{
        "border-l": [borderColor]
      }],
      /**
       * Divide Color
       * @see https://tailwindcss.com/docs/divide-color
       */
      "divide-color": [{
        divide: [borderColor]
      }],
      /**
       * Outline Style
       * @see https://tailwindcss.com/docs/outline-style
       */
      "outline-style": [{
        outline: ["", ...getLineStyles()]
      }],
      /**
       * Outline Offset
       * @see https://tailwindcss.com/docs/outline-offset
       */
      "outline-offset": [{
        "outline-offset": [isLength, isArbitraryValue]
      }],
      /**
       * Outline Width
       * @see https://tailwindcss.com/docs/outline-width
       */
      "outline-w": [{
        outline: [isLength, isArbitraryLength]
      }],
      /**
       * Outline Color
       * @see https://tailwindcss.com/docs/outline-color
       */
      "outline-color": [{
        outline: [colors]
      }],
      /**
       * Ring Width
       * @see https://tailwindcss.com/docs/ring-width
       */
      "ring-w": [{
        ring: getLengthWithEmptyAndArbitrary()
      }],
      /**
       * Ring Width Inset
       * @see https://tailwindcss.com/docs/ring-width
       */
      "ring-w-inset": ["ring-inset"],
      /**
       * Ring Color
       * @see https://tailwindcss.com/docs/ring-color
       */
      "ring-color": [{
        ring: [colors]
      }],
      /**
       * Ring Opacity
       * @see https://tailwindcss.com/docs/ring-opacity
       */
      "ring-opacity": [{
        "ring-opacity": [opacity]
      }],
      /**
       * Ring Offset Width
       * @see https://tailwindcss.com/docs/ring-offset-width
       */
      "ring-offset-w": [{
        "ring-offset": [isLength, isArbitraryLength]
      }],
      /**
       * Ring Offset Color
       * @see https://tailwindcss.com/docs/ring-offset-color
       */
      "ring-offset-color": [{
        "ring-offset": [colors]
      }],
      // Effects
      /**
       * Box Shadow
       * @see https://tailwindcss.com/docs/box-shadow
       */
      shadow: [{
        shadow: ["", "inner", "none", isTshirtSize, isArbitraryShadow]
      }],
      /**
       * Box Shadow Color
       * @see https://tailwindcss.com/docs/box-shadow-color
       */
      "shadow-color": [{
        shadow: [isAny]
      }],
      /**
       * Opacity
       * @see https://tailwindcss.com/docs/opacity
       */
      opacity: [{
        opacity: [opacity]
      }],
      /**
       * Mix Blend Mode
       * @see https://tailwindcss.com/docs/mix-blend-mode
       */
      "mix-blend": [{
        "mix-blend": [...getBlendModes(), "plus-lighter", "plus-darker"]
      }],
      /**
       * Background Blend Mode
       * @see https://tailwindcss.com/docs/background-blend-mode
       */
      "bg-blend": [{
        "bg-blend": getBlendModes()
      }],
      // Filters
      /**
       * Filter
       * @deprecated since Tailwind CSS v3.0.0
       * @see https://tailwindcss.com/docs/filter
       */
      filter: [{
        filter: ["", "none"]
      }],
      /**
       * Blur
       * @see https://tailwindcss.com/docs/blur
       */
      blur: [{
        blur: [blur]
      }],
      /**
       * Brightness
       * @see https://tailwindcss.com/docs/brightness
       */
      brightness: [{
        brightness: [brightness]
      }],
      /**
       * Contrast
       * @see https://tailwindcss.com/docs/contrast
       */
      contrast: [{
        contrast: [contrast]
      }],
      /**
       * Drop Shadow
       * @see https://tailwindcss.com/docs/drop-shadow
       */
      "drop-shadow": [{
        "drop-shadow": ["", "none", isTshirtSize, isArbitraryValue]
      }],
      /**
       * Grayscale
       * @see https://tailwindcss.com/docs/grayscale
       */
      grayscale: [{
        grayscale: [grayscale]
      }],
      /**
       * Hue Rotate
       * @see https://tailwindcss.com/docs/hue-rotate
       */
      "hue-rotate": [{
        "hue-rotate": [hueRotate]
      }],
      /**
       * Invert
       * @see https://tailwindcss.com/docs/invert
       */
      invert: [{
        invert: [invert]
      }],
      /**
       * Saturate
       * @see https://tailwindcss.com/docs/saturate
       */
      saturate: [{
        saturate: [saturate]
      }],
      /**
       * Sepia
       * @see https://tailwindcss.com/docs/sepia
       */
      sepia: [{
        sepia: [sepia]
      }],
      /**
       * Backdrop Filter
       * @deprecated since Tailwind CSS v3.0.0
       * @see https://tailwindcss.com/docs/backdrop-filter
       */
      "backdrop-filter": [{
        "backdrop-filter": ["", "none"]
      }],
      /**
       * Backdrop Blur
       * @see https://tailwindcss.com/docs/backdrop-blur
       */
      "backdrop-blur": [{
        "backdrop-blur": [blur]
      }],
      /**
       * Backdrop Brightness
       * @see https://tailwindcss.com/docs/backdrop-brightness
       */
      "backdrop-brightness": [{
        "backdrop-brightness": [brightness]
      }],
      /**
       * Backdrop Contrast
       * @see https://tailwindcss.com/docs/backdrop-contrast
       */
      "backdrop-contrast": [{
        "backdrop-contrast": [contrast]
      }],
      /**
       * Backdrop Grayscale
       * @see https://tailwindcss.com/docs/backdrop-grayscale
       */
      "backdrop-grayscale": [{
        "backdrop-grayscale": [grayscale]
      }],
      /**
       * Backdrop Hue Rotate
       * @see https://tailwindcss.com/docs/backdrop-hue-rotate
       */
      "backdrop-hue-rotate": [{
        "backdrop-hue-rotate": [hueRotate]
      }],
      /**
       * Backdrop Invert
       * @see https://tailwindcss.com/docs/backdrop-invert
       */
      "backdrop-invert": [{
        "backdrop-invert": [invert]
      }],
      /**
       * Backdrop Opacity
       * @see https://tailwindcss.com/docs/backdrop-opacity
       */
      "backdrop-opacity": [{
        "backdrop-opacity": [opacity]
      }],
      /**
       * Backdrop Saturate
       * @see https://tailwindcss.com/docs/backdrop-saturate
       */
      "backdrop-saturate": [{
        "backdrop-saturate": [saturate]
      }],
      /**
       * Backdrop Sepia
       * @see https://tailwindcss.com/docs/backdrop-sepia
       */
      "backdrop-sepia": [{
        "backdrop-sepia": [sepia]
      }],
      // Tables
      /**
       * Border Collapse
       * @see https://tailwindcss.com/docs/border-collapse
       */
      "border-collapse": [{
        border: ["collapse", "separate"]
      }],
      /**
       * Border Spacing
       * @see https://tailwindcss.com/docs/border-spacing
       */
      "border-spacing": [{
        "border-spacing": [borderSpacing]
      }],
      /**
       * Border Spacing X
       * @see https://tailwindcss.com/docs/border-spacing
       */
      "border-spacing-x": [{
        "border-spacing-x": [borderSpacing]
      }],
      /**
       * Border Spacing Y
       * @see https://tailwindcss.com/docs/border-spacing
       */
      "border-spacing-y": [{
        "border-spacing-y": [borderSpacing]
      }],
      /**
       * Table Layout
       * @see https://tailwindcss.com/docs/table-layout
       */
      "table-layout": [{
        table: ["auto", "fixed"]
      }],
      /**
       * Caption Side
       * @see https://tailwindcss.com/docs/caption-side
       */
      caption: [{
        caption: ["top", "bottom"]
      }],
      // Transitions and Animation
      /**
       * Tranisition Property
       * @see https://tailwindcss.com/docs/transition-property
       */
      transition: [{
        transition: ["none", "all", "", "colors", "opacity", "shadow", "transform", isArbitraryValue]
      }],
      /**
       * Transition Duration
       * @see https://tailwindcss.com/docs/transition-duration
       */
      duration: [{
        duration: getNumberAndArbitrary()
      }],
      /**
       * Transition Timing Function
       * @see https://tailwindcss.com/docs/transition-timing-function
       */
      ease: [{
        ease: ["linear", "in", "out", "in-out", isArbitraryValue]
      }],
      /**
       * Transition Delay
       * @see https://tailwindcss.com/docs/transition-delay
       */
      delay: [{
        delay: getNumberAndArbitrary()
      }],
      /**
       * Animation
       * @see https://tailwindcss.com/docs/animation
       */
      animate: [{
        animate: ["none", "spin", "ping", "pulse", "bounce", isArbitraryValue]
      }],
      // Transforms
      /**
       * Transform
       * @see https://tailwindcss.com/docs/transform
       */
      transform: [{
        transform: ["", "gpu", "none"]
      }],
      /**
       * Scale
       * @see https://tailwindcss.com/docs/scale
       */
      scale: [{
        scale: [scale]
      }],
      /**
       * Scale X
       * @see https://tailwindcss.com/docs/scale
       */
      "scale-x": [{
        "scale-x": [scale]
      }],
      /**
       * Scale Y
       * @see https://tailwindcss.com/docs/scale
       */
      "scale-y": [{
        "scale-y": [scale]
      }],
      /**
       * Rotate
       * @see https://tailwindcss.com/docs/rotate
       */
      rotate: [{
        rotate: [isInteger, isArbitraryValue]
      }],
      /**
       * Translate X
       * @see https://tailwindcss.com/docs/translate
       */
      "translate-x": [{
        "translate-x": [translate]
      }],
      /**
       * Translate Y
       * @see https://tailwindcss.com/docs/translate
       */
      "translate-y": [{
        "translate-y": [translate]
      }],
      /**
       * Skew X
       * @see https://tailwindcss.com/docs/skew
       */
      "skew-x": [{
        "skew-x": [skew]
      }],
      /**
       * Skew Y
       * @see https://tailwindcss.com/docs/skew
       */
      "skew-y": [{
        "skew-y": [skew]
      }],
      /**
       * Transform Origin
       * @see https://tailwindcss.com/docs/transform-origin
       */
      "transform-origin": [{
        origin: ["center", "top", "top-right", "right", "bottom-right", "bottom", "bottom-left", "left", "top-left", isArbitraryValue]
      }],
      // Interactivity
      /**
       * Accent Color
       * @see https://tailwindcss.com/docs/accent-color
       */
      accent: [{
        accent: ["auto", colors]
      }],
      /**
       * Appearance
       * @see https://tailwindcss.com/docs/appearance
       */
      appearance: [{
        appearance: ["none", "auto"]
      }],
      /**
       * Cursor
       * @see https://tailwindcss.com/docs/cursor
       */
      cursor: [{
        cursor: ["auto", "default", "pointer", "wait", "text", "move", "help", "not-allowed", "none", "context-menu", "progress", "cell", "crosshair", "vertical-text", "alias", "copy", "no-drop", "grab", "grabbing", "all-scroll", "col-resize", "row-resize", "n-resize", "e-resize", "s-resize", "w-resize", "ne-resize", "nw-resize", "se-resize", "sw-resize", "ew-resize", "ns-resize", "nesw-resize", "nwse-resize", "zoom-in", "zoom-out", isArbitraryValue]
      }],
      /**
       * Caret Color
       * @see https://tailwindcss.com/docs/just-in-time-mode#caret-color-utilities
       */
      "caret-color": [{
        caret: [colors]
      }],
      /**
       * Pointer Events
       * @see https://tailwindcss.com/docs/pointer-events
       */
      "pointer-events": [{
        "pointer-events": ["none", "auto"]
      }],
      /**
       * Resize
       * @see https://tailwindcss.com/docs/resize
       */
      resize: [{
        resize: ["none", "y", "x", ""]
      }],
      /**
       * Scroll Behavior
       * @see https://tailwindcss.com/docs/scroll-behavior
       */
      "scroll-behavior": [{
        scroll: ["auto", "smooth"]
      }],
      /**
       * Scroll Margin
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-m": [{
        "scroll-m": getSpacingWithArbitrary()
      }],
      /**
       * Scroll Margin X
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mx": [{
        "scroll-mx": getSpacingWithArbitrary()
      }],
      /**
       * Scroll Margin Y
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-my": [{
        "scroll-my": getSpacingWithArbitrary()
      }],
      /**
       * Scroll Margin Start
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-ms": [{
        "scroll-ms": getSpacingWithArbitrary()
      }],
      /**
       * Scroll Margin End
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-me": [{
        "scroll-me": getSpacingWithArbitrary()
      }],
      /**
       * Scroll Margin Top
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mt": [{
        "scroll-mt": getSpacingWithArbitrary()
      }],
      /**
       * Scroll Margin Right
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mr": [{
        "scroll-mr": getSpacingWithArbitrary()
      }],
      /**
       * Scroll Margin Bottom
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mb": [{
        "scroll-mb": getSpacingWithArbitrary()
      }],
      /**
       * Scroll Margin Left
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-ml": [{
        "scroll-ml": getSpacingWithArbitrary()
      }],
      /**
       * Scroll Padding
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-p": [{
        "scroll-p": getSpacingWithArbitrary()
      }],
      /**
       * Scroll Padding X
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-px": [{
        "scroll-px": getSpacingWithArbitrary()
      }],
      /**
       * Scroll Padding Y
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-py": [{
        "scroll-py": getSpacingWithArbitrary()
      }],
      /**
       * Scroll Padding Start
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-ps": [{
        "scroll-ps": getSpacingWithArbitrary()
      }],
      /**
       * Scroll Padding End
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pe": [{
        "scroll-pe": getSpacingWithArbitrary()
      }],
      /**
       * Scroll Padding Top
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pt": [{
        "scroll-pt": getSpacingWithArbitrary()
      }],
      /**
       * Scroll Padding Right
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pr": [{
        "scroll-pr": getSpacingWithArbitrary()
      }],
      /**
       * Scroll Padding Bottom
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pb": [{
        "scroll-pb": getSpacingWithArbitrary()
      }],
      /**
       * Scroll Padding Left
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pl": [{
        "scroll-pl": getSpacingWithArbitrary()
      }],
      /**
       * Scroll Snap Align
       * @see https://tailwindcss.com/docs/scroll-snap-align
       */
      "snap-align": [{
        snap: ["start", "end", "center", "align-none"]
      }],
      /**
       * Scroll Snap Stop
       * @see https://tailwindcss.com/docs/scroll-snap-stop
       */
      "snap-stop": [{
        snap: ["normal", "always"]
      }],
      /**
       * Scroll Snap Type
       * @see https://tailwindcss.com/docs/scroll-snap-type
       */
      "snap-type": [{
        snap: ["none", "x", "y", "both"]
      }],
      /**
       * Scroll Snap Type Strictness
       * @see https://tailwindcss.com/docs/scroll-snap-type
       */
      "snap-strictness": [{
        snap: ["mandatory", "proximity"]
      }],
      /**
       * Touch Action
       * @see https://tailwindcss.com/docs/touch-action
       */
      touch: [{
        touch: ["auto", "none", "manipulation"]
      }],
      /**
       * Touch Action X
       * @see https://tailwindcss.com/docs/touch-action
       */
      "touch-x": [{
        "touch-pan": ["x", "left", "right"]
      }],
      /**
       * Touch Action Y
       * @see https://tailwindcss.com/docs/touch-action
       */
      "touch-y": [{
        "touch-pan": ["y", "up", "down"]
      }],
      /**
       * Touch Action Pinch Zoom
       * @see https://tailwindcss.com/docs/touch-action
       */
      "touch-pz": ["touch-pinch-zoom"],
      /**
       * User Select
       * @see https://tailwindcss.com/docs/user-select
       */
      select: [{
        select: ["none", "text", "all", "auto"]
      }],
      /**
       * Will Change
       * @see https://tailwindcss.com/docs/will-change
       */
      "will-change": [{
        "will-change": ["auto", "scroll", "contents", "transform", isArbitraryValue]
      }],
      // SVG
      /**
       * Fill
       * @see https://tailwindcss.com/docs/fill
       */
      fill: [{
        fill: [colors, "none"]
      }],
      /**
       * Stroke Width
       * @see https://tailwindcss.com/docs/stroke-width
       */
      "stroke-w": [{
        stroke: [isLength, isArbitraryLength, isArbitraryNumber]
      }],
      /**
       * Stroke
       * @see https://tailwindcss.com/docs/stroke
       */
      stroke: [{
        stroke: [colors, "none"]
      }],
      // Accessibility
      /**
       * Screen Readers
       * @see https://tailwindcss.com/docs/screen-readers
       */
      sr: ["sr-only", "not-sr-only"],
      /**
       * Forced Color Adjust
       * @see https://tailwindcss.com/docs/forced-color-adjust
       */
      "forced-color-adjust": [{
        "forced-color-adjust": ["auto", "none"]
      }]
    },
    conflictingClassGroups: {
      overflow: ["overflow-x", "overflow-y"],
      overscroll: ["overscroll-x", "overscroll-y"],
      inset: ["inset-x", "inset-y", "start", "end", "top", "right", "bottom", "left"],
      "inset-x": ["right", "left"],
      "inset-y": ["top", "bottom"],
      flex: ["basis", "grow", "shrink"],
      gap: ["gap-x", "gap-y"],
      p: ["px", "py", "ps", "pe", "pt", "pr", "pb", "pl"],
      px: ["pr", "pl"],
      py: ["pt", "pb"],
      m: ["mx", "my", "ms", "me", "mt", "mr", "mb", "ml"],
      mx: ["mr", "ml"],
      my: ["mt", "mb"],
      size: ["w", "h"],
      "font-size": ["leading"],
      "fvn-normal": ["fvn-ordinal", "fvn-slashed-zero", "fvn-figure", "fvn-spacing", "fvn-fraction"],
      "fvn-ordinal": ["fvn-normal"],
      "fvn-slashed-zero": ["fvn-normal"],
      "fvn-figure": ["fvn-normal"],
      "fvn-spacing": ["fvn-normal"],
      "fvn-fraction": ["fvn-normal"],
      "line-clamp": ["display", "overflow"],
      rounded: ["rounded-s", "rounded-e", "rounded-t", "rounded-r", "rounded-b", "rounded-l", "rounded-ss", "rounded-se", "rounded-ee", "rounded-es", "rounded-tl", "rounded-tr", "rounded-br", "rounded-bl"],
      "rounded-s": ["rounded-ss", "rounded-es"],
      "rounded-e": ["rounded-se", "rounded-ee"],
      "rounded-t": ["rounded-tl", "rounded-tr"],
      "rounded-r": ["rounded-tr", "rounded-br"],
      "rounded-b": ["rounded-br", "rounded-bl"],
      "rounded-l": ["rounded-tl", "rounded-bl"],
      "border-spacing": ["border-spacing-x", "border-spacing-y"],
      "border-w": ["border-w-s", "border-w-e", "border-w-t", "border-w-r", "border-w-b", "border-w-l"],
      "border-w-x": ["border-w-r", "border-w-l"],
      "border-w-y": ["border-w-t", "border-w-b"],
      "border-color": ["border-color-s", "border-color-e", "border-color-t", "border-color-r", "border-color-b", "border-color-l"],
      "border-color-x": ["border-color-r", "border-color-l"],
      "border-color-y": ["border-color-t", "border-color-b"],
      "scroll-m": ["scroll-mx", "scroll-my", "scroll-ms", "scroll-me", "scroll-mt", "scroll-mr", "scroll-mb", "scroll-ml"],
      "scroll-mx": ["scroll-mr", "scroll-ml"],
      "scroll-my": ["scroll-mt", "scroll-mb"],
      "scroll-p": ["scroll-px", "scroll-py", "scroll-ps", "scroll-pe", "scroll-pt", "scroll-pr", "scroll-pb", "scroll-pl"],
      "scroll-px": ["scroll-pr", "scroll-pl"],
      "scroll-py": ["scroll-pt", "scroll-pb"],
      touch: ["touch-x", "touch-y", "touch-pz"],
      "touch-x": ["touch"],
      "touch-y": ["touch"],
      "touch-pz": ["touch"]
    },
    conflictingClassGroupModifiers: {
      "font-size": ["leading"]
    }
  };
};
const twMerge = /* @__PURE__ */ createTailwindMerge(getDefaultConfig);
function cn(...inputs) {
  return twMerge(clsx(inputs));
}
const TabsContext = createContext({
  value: "",
  onValueChange: () => {
  }
});
function Tabs({
  defaultValue = "",
  value: controlledValue,
  onValueChange,
  children,
  className
}) {
  const [internalValue, setInternalValue] = useState(defaultValue);
  const value = controlledValue !== void 0 ? controlledValue : internalValue;
  const handleChange = (newValue) => {
    setInternalValue(newValue);
    onValueChange == null ? void 0 : onValueChange(newValue);
  };
  return /* @__PURE__ */ jsx(TabsContext.Provider, { value: { value, onValueChange: handleChange }, children: /* @__PURE__ */ jsx("div", { "data-slot": "tabs", className: cn("flex flex-col gap-2", className), children }) });
}
function TabsList({ className, children }) {
  return /* @__PURE__ */ jsx(
    "div",
    {
      "data-slot": "tabs-list",
      role: "tablist",
      className: cn("inline-flex items-center justify-center", className),
      children
    }
  );
}
function TabsTrigger({
  value,
  className,
  children
}) {
  const { value: activeValue, onValueChange } = useContext(TabsContext);
  const isActive = activeValue === value;
  return /* @__PURE__ */ jsx(
    "button",
    {
      type: "button",
      role: "tab",
      "data-slot": "tabs-trigger",
      "data-state": isActive ? "active" : "inactive",
      "aria-selected": isActive,
      onClick: () => onValueChange(value),
      className: cn(
        "inline-flex items-center justify-center whitespace-nowrap text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50",
        className
      ),
      children
    }
  );
}
function TabsContent({
  value,
  className,
  children
}) {
  const { value: activeValue } = useContext(TabsContext);
  if (activeValue !== value) return null;
  return /* @__PURE__ */ jsx(
    "div",
    {
      role: "tabpanel",
      "data-slot": "tabs-content",
      "data-state": "active",
      className: cn(className),
      children
    }
  );
}
let _mcpServerUrl = typeof window !== "undefined" && window.__DSS_MCP_URL__ ? window.__DSS_MCP_URL__ : "http://localhost:3001";
function setMcpServerUrl(url) {
  _mcpServerUrl = url.replace(/\/$/, "");
}
function getMcpServerUrl() {
  return _mcpServerUrl;
}
let _simulatedViewportWidth = null;
function setSimulatedViewportWidth(px) {
  _simulatedViewportWidth = px;
}
function getSimulatedViewportWidth() {
  if (_simulatedViewportWidth !== null) return _simulatedViewportWidth;
  return typeof window !== "undefined" ? window.innerWidth : 1440;
}
let _connected = false;
function isMcpConnected() {
  return _connected;
}
/**
 * @license lucide-react v0.400.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const toKebabCase = (string) => string.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase();
const mergeClasses = (...classes) => classes.filter((className, index, array) => {
  return Boolean(className) && array.indexOf(className) === index;
}).join(" ");
/**
 * @license lucide-react v0.400.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
var defaultAttributes = {
  xmlns: "http://www.w3.org/2000/svg",
  width: 24,
  height: 24,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round",
  strokeLinejoin: "round"
};
/**
 * @license lucide-react v0.400.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Icon = forwardRef(
  ({
    color = "currentColor",
    size = 24,
    strokeWidth = 2,
    absoluteStrokeWidth,
    className = "",
    children,
    iconNode,
    ...rest
  }, ref) => {
    return createElement(
      "svg",
      {
        ref,
        ...defaultAttributes,
        width: size,
        height: size,
        stroke: color,
        strokeWidth: absoluteStrokeWidth ? Number(strokeWidth) * 24 / Number(size) : strokeWidth,
        className: mergeClasses("lucide", className),
        ...rest
      },
      [
        ...iconNode.map(([tag, attrs]) => createElement(tag, attrs)),
        ...Array.isArray(children) ? children : [children]
      ]
    );
  }
);
/**
 * @license lucide-react v0.400.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const createLucideIcon = (iconName, iconNode) => {
  const Component2 = forwardRef(
    ({ className, ...props }, ref) => createElement(Icon, {
      ref,
      iconNode,
      className: mergeClasses(`lucide-${toKebabCase(iconName)}`, className),
      ...props
    })
  );
  Component2.displayName = `${iconName}`;
  return Component2;
};
/**
 * @license lucide-react v0.400.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const ArrowLeftRight = createLucideIcon("ArrowLeftRight", [
  ["path", { d: "M8 3 4 7l4 4", key: "9rb6wj" }],
  ["path", { d: "M4 7h16", key: "6tx8e3" }],
  ["path", { d: "m16 21 4-4-4-4", key: "siv7j2" }],
  ["path", { d: "M20 17H4", key: "h6l3hr" }]
]);
/**
 * @license lucide-react v0.400.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const ArrowUpDown = createLucideIcon("ArrowUpDown", [
  ["path", { d: "m21 16-4 4-4-4", key: "f6ql7i" }],
  ["path", { d: "M17 20V4", key: "1ejh1v" }],
  ["path", { d: "m3 8 4-4 4 4", key: "11wl7u" }],
  ["path", { d: "M7 4v16", key: "1glfcx" }]
]);
/**
 * @license lucide-react v0.400.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Box = createLucideIcon("Box", [
  [
    "path",
    {
      d: "M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z",
      key: "hh9hay"
    }
  ],
  ["path", { d: "m3.3 7 8.7 5 8.7-5", key: "g66t2b" }],
  ["path", { d: "M12 22V12", key: "d0xqtd" }]
]);
/**
 * @license lucide-react v0.400.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const ChevronDown = createLucideIcon("ChevronDown", [
  ["path", { d: "m6 9 6 6 6-6", key: "qrunsl" }]
]);
/**
 * @license lucide-react v0.400.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const ChevronLeft = createLucideIcon("ChevronLeft", [
  ["path", { d: "m15 18-6-6 6-6", key: "1wnfg3" }]
]);
/**
 * @license lucide-react v0.400.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const ChevronRight = createLucideIcon("ChevronRight", [
  ["path", { d: "m9 18 6-6-6-6", key: "mthhwq" }]
]);
/**
 * @license lucide-react v0.400.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const CircleCheckBig = createLucideIcon("CircleCheckBig", [
  ["path", { d: "M22 11.08V12a10 10 0 1 1-5.93-9.14", key: "g774vq" }],
  ["path", { d: "m9 11 3 3L22 4", key: "1pflzl" }]
]);
/**
 * @license lucide-react v0.400.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Download = createLucideIcon("Download", [
  ["path", { d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4", key: "ih7n3h" }],
  ["polyline", { points: "7 10 12 15 17 10", key: "2ggqvy" }],
  ["line", { x1: "12", x2: "12", y1: "15", y2: "3", key: "1vk2je" }]
]);
/**
 * @license lucide-react v0.400.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Eye = createLucideIcon("Eye", [
  ["path", { d: "M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z", key: "rwhkz3" }],
  ["circle", { cx: "12", cy: "12", r: "3", key: "1v7zrd" }]
]);
/**
 * @license lucide-react v0.400.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Grid3x3 = createLucideIcon("Grid3x3", [
  ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2", key: "afitv7" }],
  ["path", { d: "M3 9h18", key: "1pudct" }],
  ["path", { d: "M3 15h18", key: "5xshup" }],
  ["path", { d: "M9 3v18", key: "fh3hqa" }],
  ["path", { d: "M15 3v18", key: "14nvp0" }]
]);
/**
 * @license lucide-react v0.400.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Info = createLucideIcon("Info", [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["path", { d: "M12 16v-4", key: "1dtifu" }],
  ["path", { d: "M12 8h.01", key: "e9boi3" }]
]);
/**
 * @license lucide-react v0.400.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Layers = createLucideIcon("Layers", [
  [
    "path",
    {
      d: "m12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83Z",
      key: "8b97xw"
    }
  ],
  ["path", { d: "m22 17.65-9.17 4.16a2 2 0 0 1-1.66 0L2 17.65", key: "dd6zsq" }],
  ["path", { d: "m22 12.65-9.17 4.16a2 2 0 0 1-1.66 0L2 12.65", key: "ep9fru" }]
]);
/**
 * @license lucide-react v0.400.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Palette = createLucideIcon("Palette", [
  ["circle", { cx: "13.5", cy: "6.5", r: ".5", fill: "currentColor", key: "1okk4w" }],
  ["circle", { cx: "17.5", cy: "10.5", r: ".5", fill: "currentColor", key: "f64h9f" }],
  ["circle", { cx: "8.5", cy: "7.5", r: ".5", fill: "currentColor", key: "fotxhn" }],
  ["circle", { cx: "6.5", cy: "12.5", r: ".5", fill: "currentColor", key: "qy21gx" }],
  [
    "path",
    {
      d: "M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z",
      key: "12rzf8"
    }
  ]
]);
/**
 * @license lucide-react v0.400.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const TriangleAlert = createLucideIcon("TriangleAlert", [
  [
    "path",
    {
      d: "m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3",
      key: "wmoenq"
    }
  ],
  ["path", { d: "M12 9v4", key: "juzpu7" }],
  ["path", { d: "M12 17h.01", key: "p32p05" }]
]);
/**
 * @license lucide-react v0.400.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const WifiOff = createLucideIcon("WifiOff", [
  ["path", { d: "M12 20h.01", key: "zekei9" }],
  ["path", { d: "M8.5 16.429a5 5 0 0 1 7 0", key: "1bycff" }],
  ["path", { d: "M5 12.859a10 10 0 0 1 5.17-2.69", key: "1dl1wf" }],
  ["path", { d: "M19 12.859a10 10 0 0 0-2.007-1.523", key: "4k23kn" }],
  ["path", { d: "M2 8.82a15 15 0 0 1 4.177-2.643", key: "1grhjp" }],
  ["path", { d: "M22 8.82a15 15 0 0 0-11.288-3.764", key: "z3jwby" }],
  ["path", { d: "m2 2 20 20", key: "1ooewy" }]
]);
/**
 * @license lucide-react v0.400.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Wifi = createLucideIcon("Wifi", [
  ["path", { d: "M12 20h.01", key: "zekei9" }],
  ["path", { d: "M2 8.82a15 15 0 0 1 20 0", key: "dnpr2z" }],
  ["path", { d: "M5 12.859a10 10 0 0 1 14 0", key: "1x1e6c" }],
  ["path", { d: "M8.5 16.429a5 5 0 0 1 7 0", key: "1bycff" }]
]);
/**
 * @license lucide-react v0.400.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const X = createLucideIcon("X", [
  ["path", { d: "M18 6 6 18", key: "1bl5f8" }],
  ["path", { d: "m6 6 12 12", key: "d8bk6v" }]
]);
const AccordionContext = createContext({
  openItems: [],
  toggle: () => {
  },
  type: "multiple"
});
const AccordionItemContext = createContext({
  value: "",
  isOpen: false
});
function Accordion({
  type = "multiple",
  defaultValue,
  children,
  className
}) {
  const initial = defaultValue ? Array.isArray(defaultValue) ? defaultValue : [defaultValue] : [];
  const [openItems, setOpenItems] = useState(initial);
  const toggle = (value) => {
    if (type === "single") {
      setOpenItems((prev) => prev.includes(value) ? [] : [value]);
    } else {
      setOpenItems(
        (prev) => prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
      );
    }
  };
  return /* @__PURE__ */ jsx(AccordionContext.Provider, { value: { openItems, toggle, type }, children: /* @__PURE__ */ jsx("div", { "data-slot": "accordion", className, children }) });
}
function AccordionItem({
  value,
  className,
  children
}) {
  const { openItems } = useContext(AccordionContext);
  const isOpen = openItems.includes(value);
  return /* @__PURE__ */ jsx(AccordionItemContext.Provider, { value: { value, isOpen }, children: /* @__PURE__ */ jsx("div", { "data-slot": "accordion-item", className: cn("border-b last:border-b-0", className), children }) });
}
function AccordionTrigger({
  className,
  children
}) {
  const { toggle } = useContext(AccordionContext);
  const { value, isOpen } = useContext(AccordionItemContext);
  return /* @__PURE__ */ jsx("div", { className: "flex", children: /* @__PURE__ */ jsxs(
    "button",
    {
      type: "button",
      "data-slot": "accordion-trigger",
      "data-state": isOpen ? "open" : "closed",
      onClick: () => toggle(value),
      className: cn(
        "flex flex-1 items-center justify-between gap-4 py-4 text-left text-sm font-medium transition-all hover:underline [&[data-state=open]>svg]:rotate-180 w-full",
        className
      ),
      children: [
        children,
        /* @__PURE__ */ jsx(ChevronDown, { className: "h-4 w-4 shrink-0 transition-transform duration-200" })
      ]
    }
  ) });
}
function AccordionContent({
  className,
  children
}) {
  const { isOpen } = useContext(AccordionItemContext);
  if (!isOpen) return null;
  return /* @__PURE__ */ jsx(
    "div",
    {
      "data-slot": "accordion-content",
      "data-state": "open",
      className: cn("overflow-hidden text-sm", className),
      children
    }
  );
}
function Slider({
  value,
  defaultValue,
  onValueChange,
  min = 0,
  max = 100,
  step = 1,
  disabled = false,
  className
}) {
  const current = (value == null ? void 0 : value[0]) ?? (defaultValue == null ? void 0 : defaultValue[0]) ?? min;
  const pct = Math.max(0, Math.min(100, (current - min) / (max - min) * 100));
  return /* @__PURE__ */ jsxs(
    "div",
    {
      "data-slot": "slider",
      className: cn("relative flex w-full touch-none items-center select-none h-5", className),
      children: [
        /* @__PURE__ */ jsx("div", { className: "relative h-1.5 w-full rounded-full bg-slate-200 overflow-hidden", children: /* @__PURE__ */ jsx(
          "div",
          {
            className: "absolute h-full bg-slate-400 rounded-full",
            style: { width: `${pct}%` }
          }
        ) }),
        /* @__PURE__ */ jsx(
          "div",
          {
            role: "slider",
            "aria-valuemin": min,
            "aria-valuemax": max,
            "aria-valuenow": current,
            className: "absolute h-4 w-4 rounded-full border border-slate-300 bg-white shadow-sm pointer-events-none",
            style: { left: `calc(${pct}% - 8px)` }
          }
        ),
        /* @__PURE__ */ jsx(
          "input",
          {
            type: "range",
            value: current,
            min,
            max,
            step,
            disabled,
            onChange: (e) => onValueChange == null ? void 0 : onValueChange([Number(e.target.value)]),
            className: "absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed",
            style: { margin: 0 }
          }
        )
      ]
    }
  );
}
function Switch({
  checked = false,
  onCheckedChange,
  disabled,
  id,
  className
}) {
  return /* @__PURE__ */ jsx(
    "button",
    {
      type: "button",
      role: "switch",
      id,
      "aria-checked": checked,
      "data-slot": "switch",
      "data-state": checked ? "checked" : "unchecked",
      disabled,
      onClick: () => !disabled && (onCheckedChange == null ? void 0 : onCheckedChange(!checked)),
      className: cn(
        "peer inline-flex h-[1.15rem] w-8 shrink-0 items-center rounded-full border border-transparent transition-all outline-none focus-visible:ring-2 focus-visible:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50",
        className
      ),
      children: /* @__PURE__ */ jsx(
        "span",
        {
          "data-state": checked ? "checked" : "unchecked",
          className: "pointer-events-none block size-4 rounded-full bg-white shadow ring-0 transition-transform data-[state=checked]:translate-x-[calc(100%-2px)] data-[state=unchecked]:translate-x-0"
        }
      )
    }
  );
}
function Label({ htmlFor, className, children }) {
  return /* @__PURE__ */ jsx(
    "label",
    {
      htmlFor,
      "data-slot": "label",
      className: cn(
        "flex items-center gap-2 text-sm leading-none font-medium select-none",
        className
      ),
      children
    }
  );
}
const ToggleGroupContext = createContext({
  value: "",
  onValueChange: () => {
  }
});
function ToggleGroup({
  type: _type = "single",
  value = "",
  onValueChange,
  children,
  className
}) {
  return /* @__PURE__ */ jsx(ToggleGroupContext.Provider, { value: { value, onValueChange: onValueChange ?? (() => {
  }) }, children: /* @__PURE__ */ jsx(
    "div",
    {
      "data-slot": "toggle-group",
      className: cn("flex items-center", className),
      children
    }
  ) });
}
function ToggleGroupItem({
  value,
  children,
  className
}) {
  const { value: selectedValue, onValueChange } = useContext(ToggleGroupContext);
  const isSelected = selectedValue === value;
  return /* @__PURE__ */ jsx(
    "button",
    {
      type: "button",
      "data-slot": "toggle-group-item",
      "data-state": isSelected ? "on" : "off",
      "aria-pressed": isSelected,
      onClick: () => onValueChange(value),
      className: cn(
        "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors",
        className
      ),
      children
    }
  );
}
function Tooltip({ children }) {
  return /* @__PURE__ */ jsx("div", { className: "relative inline-block group", "data-slot": "tooltip", children });
}
function TooltipTrigger({
  children,
  asChild: _asChild
}) {
  return /* @__PURE__ */ jsx(Fragment, { children });
}
const SIDE_CLASSES = {
  top: "bottom-full left-1/2 -translate-x-1/2 mb-1",
  right: "left-full top-1/2 -translate-y-1/2 ml-2",
  bottom: "top-full left-1/2 -translate-x-1/2 mt-1",
  left: "right-full top-1/2 -translate-y-1/2 mr-2"
};
function TooltipContent({
  children,
  side = "top",
  sideOffset: _sideOffset,
  align: _align,
  hidden,
  className
}) {
  if (hidden) return null;
  return /* @__PURE__ */ jsx(
    "div",
    {
      role: "tooltip",
      "data-slot": "tooltip-content",
      className: cn(
        "absolute z-[1000002] w-max max-w-[280px] rounded-md px-3 py-1.5 text-xs",
        "opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity duration-150",
        // default dark background when no className overrides it
        "bg-slate-800 text-white",
        SIDE_CLASSES[side],
        className
      ),
      children
    }
  );
}
function FloatingGridInspector() {
  const {
    overlay,
    setOverlay,
    component,
    setComponent,
    showGrid,
    setShowGrid,
    autoColumnWidth,
    setAutoColumnWidth,
    showRows,
    setShowRows,
    brand,
    setBrand,
    violations,
    highlightedElementIndex,
    setHighlightedElementIndex
  } = useGridSystem();
  const {
    isSelectionMode,
    setIsSelectionMode,
    setSelectedElement,
    selectedElementInfo,
    selectedGridConfig,
    updateSelectedGridConfig
  } = useNestedGrid();
  const isEditingElement = isSelectionMode && selectedElementInfo !== null;
  const gridColumns = isEditingElement ? selectedGridConfig.columns : overlay.columns;
  const gridGutter = isEditingElement ? selectedGridConfig.gutterX : overlay.gutter.x;
  const gridMargin = isEditingElement ? selectedGridConfig.marginX : overlay.margin.x;
  const gridPadding = overlay.padding.x;
  const gridGutterY = isEditingElement ? selectedGridConfig.gutterY : overlay.gutter.y;
  const gridMarginY = isEditingElement ? selectedGridConfig.marginY : overlay.margin.y;
  const gridPaddingY = overlay.padding.y;
  const componentGutter = component.gutter.x;
  const componentMargin = component.margin.x;
  const componentPadding = component.padding.x;
  const componentGutterY = component.gutter.y;
  const componentMarginY = component.margin.y;
  const componentPaddingY = component.padding.y;
  const setGridColumns = (val) => {
    console.log("[FloatingInspector] setGridColumns:", val, "isEditingElement:", isEditingElement);
    if (isEditingElement) {
      updateSelectedGridConfig({ columns: val });
    } else {
      setOverlay({ columns: val });
    }
  };
  const setGridGutter = (val) => {
    console.log("[FloatingInspector] setGridGutter:", val, "isEditingElement:", isEditingElement);
    if (isEditingElement) {
      updateSelectedGridConfig({ gutterX: val });
    } else {
      setOverlay({ gutter: { ...overlay.gutter, x: val } });
    }
  };
  const setGridMargin = (val) => {
    console.log("[FloatingInspector] setGridMargin:", val, "isEditingElement:", isEditingElement);
    if (isEditingElement) {
      updateSelectedGridConfig({ marginX: val });
    } else {
      setOverlay({ margin: { ...overlay.margin, x: val } });
    }
  };
  const setGridPadding = (val) => setOverlay({ padding: { ...overlay.padding, x: val } });
  const setGridGutterY = (val) => {
    if (isEditingElement) {
      updateSelectedGridConfig({ gutterY: val });
    } else {
      setOverlay({ gutter: { ...overlay.gutter, y: val } });
    }
  };
  const setGridMarginY = (val) => {
    if (isEditingElement) {
      updateSelectedGridConfig({ marginY: val });
    } else {
      setOverlay({ margin: { ...overlay.margin, y: val } });
    }
  };
  const setGridPaddingY = (val) => setOverlay({ padding: { ...overlay.padding, y: val } });
  const setComponentGutter = (val) => setComponent({ gutter: { ...component.gutter, x: val } });
  const setComponentMargin = (val) => setComponent({ margin: { ...component.margin, x: val } });
  const setComponentPadding = (val) => setComponent({ padding: { ...component.padding, x: val } });
  const setComponentGutterY = (val) => setComponent({ gutter: { ...component.gutter, y: val } });
  const setComponentMarginY = (val) => setComponent({ margin: { ...component.margin, y: val } });
  const setComponentPaddingY = (val) => setComponent({ padding: { ...component.padding, y: val } });
  const [panelSize, setPanelSize] = useState("expanded");
  const [isVisible, setIsVisible] = useState(true);
  const [mcpConnected, setMcpConnected] = useState(false);
  useEffect(() => {
    const check = () => setMcpConnected(isMcpConnected());
    check();
    const id = setInterval(check, 5e3);
    return () => clearInterval(id);
  }, []);
  const exportReport = useCallback(() => {
    const verdict = violations.some((v) => v.severity === "critical" || v.severity === "high") ? "non-compliant" : violations.length > 0 ? "warnings" : "compliant";
    const report = {
      tool: "@sansys/grid-inspector",
      version: "1.0.0",
      timestamp: (/* @__PURE__ */ new Date()).toISOString(),
      mcpSource: mcpConnected ? "server" : "client-side",
      viewport: {
        width: typeof window !== "undefined" ? window.innerWidth : 0,
        height: typeof window !== "undefined" ? window.innerHeight : 0
      },
      grid: {
        overlay: {
          columns: overlay.columns,
          gutter: overlay.gutter,
          margin: overlay.margin,
          padding: overlay.padding
        },
        layout: {
          gutter: component.gutter,
          margin: component.margin,
          padding: component.padding
        }
      },
      verdict,
      violations: violations.map((v) => ({
        id: v.id,
        severity: v.severity,
        type: v.type,
        message: v.message,
        affectedProperty: v.affectedProperty ?? null,
        affectedValue: v.affectedValue ?? null
      }))
    };
    const blob = new Blob([JSON.stringify(report, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `grid-report-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  }, [overlay, component, violations, mcpConnected]);
  const [overlayOpacity, setOverlayOpacity] = useState(60);
  const [showColumns, setShowColumns] = useState(true);
  const [showPaddingZonesX, setShowPaddingZonesX] = useState(true);
  const [showPaddingZonesY, setShowPaddingZonesY] = useState(true);
  const [showMarginBoundariesX, setShowMarginBoundariesX] = useState(true);
  const [showMarginBoundariesY, setShowMarginBoundariesY] = useState(true);
  const [showBaselineGrid, setShowBaselineGrid] = useState(true);
  const [containerType, setContainerType] = useState("fluid");
  const [breakpoint, setBreakpoint] = useState("desktop");
  const [baselineGrid, setBaselineGrid] = useState("8px");
  const [densityMode, setDensityMode] = useState("comfortable");
  const columnOptions = [4, 6, 8, 10, 12, 16];
  useEffect(() => {
    const id = "grid-inspector-portal-zindex";
    if (!document.getElementById(id)) {
      const s = document.createElement("style");
      s.id = id;
      s.textContent = '[data-radix-popper-content-wrapper],[data-radix-select-viewport]{z-index:1000001!important}[role="switch"]>span{background:white!important;box-shadow:0 1px 3px rgba(0,0,0,.25)!important}';
      document.head.appendChild(s);
    }
    return () => {
      var _a;
      (_a = document.getElementById(id)) == null ? void 0 : _a.remove();
    };
  }, []);
  useEffect(() => {
    if (!isSelectionMode) return;
    const handleClick = (e) => {
      const root = document.getElementById("grid-inspector-root");
      if (root && root.contains(e.target)) return;
      e.preventDefault();
      e.stopPropagation();
      const el = e.target;
      setSelectedElement(el);
      setIsSelectionMode(false);
    };
    document.addEventListener("click", handleClick, true);
    return () => document.removeEventListener("click", handleClick, true);
  }, [isSelectionMode, setSelectedElement, setIsSelectionMode]);
  const BREAKPOINT_PRESETS = {
    mobile: { columns: 4, gutterX: 8, gutterY: 8, marginX: 16, marginY: 0, paddingX: 8, paddingY: 8, viewportPx: 375 },
    tablet: { columns: 8, gutterX: 16, gutterY: 16, marginX: 24, marginY: 0, paddingX: 16, paddingY: 16, viewportPx: 768 },
    desktop: { columns: 12, gutterX: 16, gutterY: 16, marginX: 24, marginY: 0, paddingX: 24, paddingY: 24, viewportPx: 1440 },
    ultra: { columns: 16, gutterX: 24, gutterY: 24, marginX: 40, marginY: 0, paddingX: 24, paddingY: 24, viewportPx: 1920 }
  };
  const handleBreakpointChange = (bp) => {
    if (!bp) return;
    setBreakpoint(bp);
    const p = BREAKPOINT_PRESETS[bp];
    if (!p) return;
    setSimulatedViewportWidth(p.viewportPx);
    setOverlay({
      columns: p.columns,
      gutter: { x: p.gutterX, y: p.gutterY },
      margin: { x: p.marginX, y: p.marginY },
      padding: { x: p.paddingX, y: p.paddingY }
    });
    setComponent({
      gutter: { x: p.gutterX, y: p.gutterY },
      margin: { x: p.marginX, y: p.marginY },
      padding: { x: p.paddingX, y: p.paddingY }
    });
  };
  useEffect(() => {
    const root = document.documentElement;
    if (brand) {
      root.setAttribute("data-brand", brand);
    } else {
      root.removeAttribute("data-brand");
    }
  }, [brand]);
  const widthClass = {
    expanded: "w-[400px]",
    minimized: "w-[60px]"
  }[panelSize];
  if (typeof document !== "undefined") {
    const root = document.documentElement;
    root.style.setProperty("--grid-overlay-visible", showGrid ? "1" : "0");
    root.style.setProperty("--grid-overlay-opacity", `${overlayOpacity / 100}`);
    root.style.setProperty("--grid-show-columns", showColumns ? "1" : "0");
    root.style.setProperty("--grid-show-gaps-x", "0");
    root.style.setProperty("--grid-show-gaps-y", "0");
    root.style.setProperty("--grid-show-padding-x", showPaddingZonesX ? "1" : "0");
    root.style.setProperty("--grid-show-padding-y", showPaddingZonesY ? "1" : "0");
    root.style.setProperty("--grid-show-margin-x", showMarginBoundariesX ? "1" : "0");
    root.style.setProperty("--grid-show-margin-y", showMarginBoundariesY ? "1" : "0");
    root.style.setProperty("--grid-container-type", containerType);
    root.style.setProperty("--grid-auto-column-width", autoColumnWidth ? "1" : "0");
    root.style.setProperty("--grid-gutter-x", gridGutter.toString());
    root.style.setProperty("--grid-margin-x", gridMargin.toString());
    const breakpointWidths = {
      mobile: "375px",
      tablet: "768px",
      desktop: "1440px",
      ultra: "1920px"
    };
    root.style.setProperty("--grid-breakpoint-width", breakpointWidths[breakpoint]);
    root.style.setProperty("--grid-container-max-width", containerType === "fluid" ? "100%" : breakpointWidths[breakpoint]);
    const densityMultipliers = {
      comfortable: "1",
      compact: "0.75",
      dense: "0.5"
    };
    root.style.setProperty("--grid-density-multiplier", densityMultipliers[densityMode]);
    root.style.setProperty("--grid-baseline", baselineGrid);
    root.style.setProperty("--grid-show-baseline", showBaselineGrid ? "1" : "0");
    const densityMult = { comfortable: 1, compact: 0.75, dense: 0.5 }[densityMode];
    root.style.setProperty("--dss-layout-gap-x", `${Math.round(componentGutter * densityMult)}px`);
    root.style.setProperty("--dss-layout-gap-y", `${Math.round(componentGutterY * densityMult)}px`);
    root.style.setProperty("--dss-layout-margin-x", `${Math.round(componentMargin * densityMult)}px`);
    root.style.setProperty("--dss-layout-margin-y", `${Math.round(componentMarginY * densityMult)}px`);
    root.style.setProperty("--dss-layout-padding-x", `${Math.round(componentPadding * densityMult)}px`);
    root.style.setProperty("--dss-layout-padding-y", `${Math.round(componentPaddingY * densityMult)}px`);
    root.style.setProperty("--dss-layout-columns", overlay.columns.toString());
    root.style.setProperty("--dss-layout-max-width", containerType === "fluid" ? "100%" : breakpointWidths[breakpoint]);
  }
  if (!isVisible) {
    return /* @__PURE__ */ jsx(
      "button",
      {
        onClick: () => setIsVisible(true),
        style: { position: "fixed", top: "6rem", right: "1rem", zIndex: 1e6, pointerEvents: "auto" },
        className: "fixed top-24 right-4 z-50 bg-gradient-to-br from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white p-3 rounded-xl shadow-2xl transition-all",
        title: "Show Grid Inspector",
        children: /* @__PURE__ */ jsx(Grid3x3, { size: 20 })
      }
    );
  }
  if (panelSize === "minimized") {
    return /* @__PURE__ */ jsxs(
      "div",
      {
        style: { position: "fixed", top: "5rem", right: "1rem", zIndex: 1e6, pointerEvents: "auto", width: "60px" },
        className: "fixed top-20 right-4 z-50 bg-white rounded-xl shadow-2xl border border-slate-200 w-[60px] overflow-hidden",
        children: [
          /* @__PURE__ */ jsx("div", { className: "p-3 border-b border-slate-200 bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center gap-2", children: [
            /* @__PURE__ */ jsx(
              "button",
              {
                onClick: () => setPanelSize("expanded"),
                className: "p-2 hover:bg-white rounded-lg transition-all",
                title: "Expand Panel",
                children: /* @__PURE__ */ jsx(ChevronLeft, { size: 16, className: "text-slate-700" })
              }
            ),
            /* @__PURE__ */ jsx(
              "button",
              {
                onClick: () => setIsVisible(false),
                className: "p-2 hover:bg-white rounded-lg transition-all",
                title: "Hide Panel",
                children: /* @__PURE__ */ jsx(X, { size: 16, className: "text-slate-400" })
              }
            )
          ] }) }),
          /* @__PURE__ */ jsxs("div", { className: "p-2 space-y-3", children: [
            /* @__PURE__ */ jsx(
              "button",
              {
                className: "w-full p-2 hover:bg-emerald-50 rounded-lg transition-all",
                title: "Layout Grid",
                onClick: () => setPanelSize("expanded"),
                children: /* @__PURE__ */ jsx(Box, { size: 20, className: "text-emerald-600 mx-auto" })
              }
            ),
            /* @__PURE__ */ jsx(
              "button",
              {
                className: "w-full p-2 hover:bg-purple-50 rounded-lg transition-all",
                title: "Overlay Grid",
                onClick: () => setPanelSize("expanded"),
                children: /* @__PURE__ */ jsx(Eye, { size: 20, className: "text-purple-600 mx-auto" })
              }
            ),
            /* @__PURE__ */ jsx(
              "button",
              {
                className: "w-full p-2 hover:bg-blue-50 rounded-lg transition-all",
                title: "Visibility",
                onClick: () => setPanelSize("expanded"),
                children: /* @__PURE__ */ jsx(Eye, { size: 20, className: "text-blue-600 mx-auto" })
              }
            ),
            /* @__PURE__ */ jsx(
              "button",
              {
                className: "w-full p-2 hover:bg-indigo-50 rounded-lg transition-all",
                title: "Advanced",
                onClick: () => setPanelSize("expanded"),
                children: /* @__PURE__ */ jsx(Layers, { size: 20, className: "text-indigo-600 mx-auto" })
              }
            )
          ] })
        ]
      }
    );
  }
  return /* @__PURE__ */ jsxs(
    "div",
    {
      style: { position: "fixed", top: "5rem", right: "1rem", zIndex: 1e6, pointerEvents: "auto" },
      className: `fixed top-20 right-4 z-50 bg-white rounded-xl shadow-2xl border border-slate-200 ${widthClass} transition-all duration-300 max-h-[calc(100vh-6rem)] flex flex-col`,
      children: [
        /* @__PURE__ */ jsx("div", { className: `px-5 py-3 border-b border-slate-200 flex-shrink-0 ${isEditingElement ? "bg-gradient-to-br from-green-50 via-emerald-50 to-green-50" : "bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50"}`, children: /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between mb-1", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsx("div", { className: `w-8 h-8 rounded-lg flex items-center justify-center ${isEditingElement ? "bg-gradient-to-br from-green-600 to-emerald-600" : "bg-gradient-to-br from-blue-600 to-purple-600"}`, children: /* @__PURE__ */ jsx(Grid3x3, { className: "text-white", size: 16 }) }),
            panelSize === "expanded" && /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsxs("h2", { className: "font-bold text-slate-900 text-sm flex items-center gap-2", children: [
                "Grid Inspector",
                isEditingElement && /* @__PURE__ */ jsx("span", { className: "text-[10px] font-bold bg-green-600 text-white px-2 py-0.5 rounded animate-pulse", children: "EDITING ELEMENT" })
              ] }),
              /* @__PURE__ */ jsxs("p", { className: "text-xs text-slate-600 flex items-center gap-1.5", children: [
                isEditingElement ? `📦 ${selectedElementInfo == null ? void 0 : selectedElementInfo.tagName} #${selectedElementInfo == null ? void 0 : selectedElementInfo.id}` : "Layout & Overlay Controls",
                /* @__PURE__ */ jsxs(
                  "span",
                  {
                    title: mcpConnected ? "MCP Server conectado" : "MCP Server offline (validação local)",
                    className: `flex items-center gap-0.5 text-[10px] font-bold px-1 py-0.5 rounded ${mcpConnected ? "text-emerald-700 bg-emerald-100" : "text-slate-400 bg-slate-100"}`,
                    children: [
                      mcpConnected ? /* @__PURE__ */ jsx(Wifi, { size: 9 }) : /* @__PURE__ */ jsx(WifiOff, { size: 9 }),
                      "MCP"
                    ]
                  }
                )
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-1", children: [
            panelSize === "expanded" && /* @__PURE__ */ jsx(
              "button",
              {
                onClick: () => setPanelSize("minimized"),
                className: "p-1.5 hover:bg-white rounded-lg transition-all",
                title: "Minimize",
                children: /* @__PURE__ */ jsx(ChevronRight, { size: 14, className: "text-slate-600" })
              }
            ),
            /* @__PURE__ */ jsx(
              "button",
              {
                onClick: () => setIsVisible(false),
                className: "p-1.5 hover:bg-white rounded-lg transition-all",
                title: "Close",
                children: /* @__PURE__ */ jsx(X, { size: 14, className: "text-slate-400" })
              }
            )
          ] })
        ] }) }),
        /* @__PURE__ */ jsxs(Tabs, { defaultValue: "layout", className: "w-full flex-1 flex flex-col overflow-hidden", children: [
          /* @__PURE__ */ jsxs(TabsList, { className: "w-full grid grid-cols-5 rounded-none border-b border-slate-200 bg-slate-50 h-auto p-0 flex-shrink-0", children: [
            /* @__PURE__ */ jsxs(
              TabsTrigger,
              {
                value: "layout",
                className: "group rounded-none border-r border-slate-200 data-[state=active]:bg-gradient-to-b data-[state=active]:from-emerald-50 data-[state=active]:to-white data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-b-emerald-600 py-3 transition-all duration-300 hover:bg-emerald-50/30 relative overflow-hidden",
                children: [
                  /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-r from-emerald-500/0 via-emerald-500/5 to-emerald-500/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-out" }),
                  /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center gap-1 relative z-10 transition-transform duration-200 group-hover:scale-110 group-active:scale-95", children: [
                    /* @__PURE__ */ jsx(Box, { size: 14, className: "text-emerald-600 transition-all duration-200 group-hover:drop-shadow-[0_0_6px_rgba(16,185,129,0.3)]" }),
                    panelSize === "expanded" && /* @__PURE__ */ jsx("span", { className: "text-xs font-semibold transition-colors duration-200", children: "Layout" })
                  ] })
                ]
              }
            ),
            /* @__PURE__ */ jsxs(
              TabsTrigger,
              {
                value: "overlay",
                className: "group rounded-none border-r border-slate-200 data-[state=active]:bg-gradient-to-b data-[state=active]:from-purple-50 data-[state=active]:to-white data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-b-purple-600 py-3 transition-all duration-300 hover:bg-purple-50/30 relative overflow-hidden",
                children: [
                  /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-r from-purple-500/0 via-purple-500/5 to-purple-500/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-out" }),
                  /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center gap-1 relative z-10 transition-transform duration-200 group-hover:scale-110 group-active:scale-95", children: [
                    /* @__PURE__ */ jsx(Eye, { size: 14, className: "text-purple-600 transition-all duration-200 group-hover:drop-shadow-[0_0_6px_rgba(168,85,247,0.3)]" }),
                    panelSize === "expanded" && /* @__PURE__ */ jsx("span", { className: "text-xs font-semibold transition-colors duration-200", children: "Overlay" })
                  ] })
                ]
              }
            ),
            /* @__PURE__ */ jsxs(
              TabsTrigger,
              {
                value: "visibility",
                className: "group rounded-none border-r border-slate-200 data-[state=active]:bg-gradient-to-b data-[state=active]:from-blue-50 data-[state=active]:to-white data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-b-blue-600 py-3 transition-all duration-300 hover:bg-blue-50/30 relative overflow-hidden",
                children: [
                  /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-r from-blue-500/0 via-blue-500/5 to-blue-500/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-out" }),
                  /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center gap-1 relative z-10 transition-transform duration-200 group-hover:scale-110 group-active:scale-95", children: [
                    /* @__PURE__ */ jsx(Eye, { size: 14, className: "text-blue-600 transition-all duration-200 group-hover:drop-shadow-[0_0_6px_rgba(37,99,235,0.3)]" }),
                    panelSize === "expanded" && /* @__PURE__ */ jsx("span", { className: "text-xs font-semibold transition-colors duration-200", children: "Show" })
                  ] })
                ]
              }
            ),
            /* @__PURE__ */ jsxs(
              TabsTrigger,
              {
                value: "advanced",
                className: "group rounded-none border-r border-slate-200 data-[state=active]:bg-gradient-to-b data-[state=active]:from-indigo-50 data-[state=active]:to-white data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-b-indigo-600 py-3 transition-all duration-300 hover:bg-indigo-50/30 relative overflow-hidden",
                children: [
                  /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-r from-indigo-500/0 via-indigo-500/5 to-indigo-500/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-out" }),
                  /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center gap-1 relative z-10 transition-transform duration-200 group-hover:scale-110 group-active:scale-95", children: [
                    /* @__PURE__ */ jsx(Layers, { size: 14, className: "text-indigo-600 transition-all duration-200 group-hover:drop-shadow-[0_0_6px_rgba(99,102,241,0.3)]" }),
                    panelSize === "expanded" && /* @__PURE__ */ jsx("span", { className: "text-xs font-semibold transition-colors duration-200", children: "Adv" })
                  ] })
                ]
              }
            ),
            /* @__PURE__ */ jsxs(
              TabsTrigger,
              {
                value: "alerts",
                className: "group rounded-none data-[state=active]:bg-gradient-to-b data-[state=active]:from-red-50 data-[state=active]:to-white data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-b-red-500 py-3 transition-all duration-300 hover:bg-red-50/30 relative overflow-hidden",
                children: [
                  /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-r from-red-500/0 via-red-500/5 to-red-500/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-out" }),
                  /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center gap-1 relative z-10 transition-transform duration-200 group-hover:scale-110 group-active:scale-95", children: [
                    /* @__PURE__ */ jsxs("div", { className: "relative", children: [
                      /* @__PURE__ */ jsx(TriangleAlert, { size: 14, className: violations.length > 0 ? "text-red-500" : "text-slate-400" }),
                      violations.length > 0 && /* @__PURE__ */ jsx("span", { className: "absolute -top-2 -right-2 w-4 h-4 bg-red-500 text-white text-[9px] font-bold rounded-full flex items-center justify-center leading-none", children: violations.length > 9 ? "9+" : violations.length })
                    ] }),
                    panelSize === "expanded" && /* @__PURE__ */ jsx("span", { className: `text-xs font-semibold transition-colors duration-200 ${violations.length > 0 ? "text-red-600" : ""}`, children: "Alerts" })
                  ] })
                ]
              }
            )
          ] }),
          /* @__PURE__ */ jsx(TabsContent, { value: "layout", className: "p-0 m-0 flex-1 overflow-y-auto animate-in fade-in-0 slide-in-from-bottom-2 duration-300", children: /* @__PURE__ */ jsxs(Accordion, { type: "multiple", defaultValue: ["spacing-x", "spacing-y"], className: "w-full", children: [
            /* @__PURE__ */ jsxs(AccordionItem, { value: "grid-structure", className: "border-b border-slate-100", children: [
              /* @__PURE__ */ jsx(AccordionTrigger, { className: "px-4 py-2.5 hover:bg-emerald-50/50 text-xs font-semibold", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
                /* @__PURE__ */ jsx(Grid3x3, { size: 14, className: "text-emerald-600" }),
                /* @__PURE__ */ jsx("span", { children: "Grid Structure" })
              ] }) }),
              /* @__PURE__ */ jsx(AccordionContent, { className: "px-4 pb-3", children: /* @__PURE__ */ jsxs("div", { className: "space-y-3", children: [
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx(Label, { className: "text-xs font-semibold text-slate-700 mb-2 block", children: "Columns" }),
                  /* @__PURE__ */ jsx("div", { className: "grid grid-cols-6 gap-1.5", children: columnOptions.map((count) => /* @__PURE__ */ jsx(
                    "button",
                    {
                      onClick: () => setGridColumns(count),
                      className: `py-2 px-2 text-xs font-bold rounded-lg transition-all border-2 ${gridColumns === count ? "bg-gradient-to-br from-emerald-500 to-emerald-600 text-white border-emerald-600 shadow-lg shadow-emerald-200/50" : "bg-white text-slate-600 border-slate-200 hover:border-emerald-300 hover:bg-emerald-50"}`,
                      children: count
                    },
                    count
                  )) })
                ] }),
                panelSize === "expanded" && /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
                  /* @__PURE__ */ jsxs("div", { className: "flex-[0.7] space-y-1.5", children: [
                    /* @__PURE__ */ jsx(Label, { htmlFor: "container-type", className: "text-xs font-semibold text-slate-700", children: "Container Type" }),
                    /* @__PURE__ */ jsx("div", { className: "grid grid-cols-2 gap-1.5", children: ["fixed", "fluid"].map((ct) => /* @__PURE__ */ jsx(
                      "button",
                      {
                        onClick: () => setContainerType(ct),
                        className: `py-1.5 px-2 text-xs font-bold rounded-lg transition-all border-2 ${containerType === ct ? "bg-gradient-to-br from-emerald-500 to-emerald-600 text-white border-emerald-600 shadow-md" : "bg-white text-slate-600 border-slate-200 hover:border-emerald-300 hover:bg-emerald-50"}`,
                        children: ct === "fixed" ? "Fixed" : "Fluid"
                      },
                      ct
                    )) })
                  ] }),
                  /* @__PURE__ */ jsxs("div", { className: "flex-[0.3] space-y-1.5", children: [
                    /* @__PURE__ */ jsxs(Label, { htmlFor: "auto-column", className: "text-xs font-semibold text-slate-700 flex items-center gap-1", children: [
                      "Auto Column",
                      /* @__PURE__ */ jsxs(Tooltip, { children: [
                        /* @__PURE__ */ jsx(TooltipTrigger, { asChild: true, children: /* @__PURE__ */ jsx("button", { type: "button", className: "p-0.5 hover:bg-slate-200 rounded transition-colors", children: /* @__PURE__ */ jsx(Info, { size: 12, className: "text-slate-500" }) }) }),
                        /* @__PURE__ */ jsxs(
                          TooltipContent,
                          {
                            side: "right",
                            className: `max-w-[280px] p-3 rounded-lg border transition-all ${autoColumnWidth ? "bg-emerald-50 border-emerald-200 text-emerald-900" : "bg-slate-800 border-slate-700 text-white"}`,
                            sideOffset: 8,
                            children: [
                              /* @__PURE__ */ jsx("p", { className: "text-xs font-bold mb-1.5", children: autoColumnWidth ? "✓ Columns Flexíveis (1fr)" : "✗ Columns Fixas" }),
                              /* @__PURE__ */ jsx("p", { className: "text-xs opacity-90", children: autoColumnWidth ? "Colunas se adaptam ao espaço disponível (grid-template-columns: repeat(N, 1fr))" : `Colunas têm largura fixa calculada: ${Math.floor(
                                (() => {
                                  const bp = breakpoint === "mobile" ? 375 : breakpoint === "tablet" ? 768 : breakpoint === "desktop" ? 1440 : 1920;
                                  return bp / gridColumns;
                                })()
                              )}px por coluna (${breakpoint === "mobile" ? "375" : breakpoint === "tablet" ? "768" : breakpoint === "desktop" ? "1440" : "1920"}px ÷ ${gridColumns} colunas)` })
                            ]
                          }
                        )
                      ] })
                    ] }),
                    /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center gap-1", children: [
                      /* @__PURE__ */ jsx(
                        Switch,
                        {
                          id: "auto-column",
                          checked: autoColumnWidth,
                          onCheckedChange: setAutoColumnWidth
                        }
                      ),
                      /* @__PURE__ */ jsx("span", { className: `text-[10px] font-bold transition-colors ${autoColumnWidth ? "text-emerald-600" : "text-slate-400"}`, children: autoColumnWidth ? "1fr" : "Fixed" })
                    ] })
                  ] })
                ] }) })
              ] }) })
            ] }),
            panelSize === "expanded" && /* @__PURE__ */ jsxs(AccordionItem, { value: "breakpoints", className: "border-b border-slate-100", children: [
              /* @__PURE__ */ jsx(AccordionTrigger, { className: "px-4 py-2.5 hover:bg-violet-50/50 text-xs font-semibold", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
                /* @__PURE__ */ jsx(Layers, { size: 14, className: "text-violet-600" }),
                /* @__PURE__ */ jsx("span", { children: "Breakpoints" })
              ] }) }),
              /* @__PURE__ */ jsx(AccordionContent, { className: "px-4 pb-3", children: /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
                /* @__PURE__ */ jsx(Label, { className: "text-xs font-semibold text-slate-700", children: "Viewport" }),
                /* @__PURE__ */ jsxs(ToggleGroup, { type: "single", value: breakpoint, onValueChange: handleBreakpointChange, className: "grid grid-cols-2 sm:grid-cols-4 gap-1.5", children: [
                  /* @__PURE__ */ jsxs(ToggleGroupItem, { value: "mobile", className: "text-xs h-auto py-1.5 px-2 data-[state=on]:bg-violet-600 data-[state=on]:text-white flex flex-col items-center gap-0.5 leading-tight", children: [
                    /* @__PURE__ */ jsx("span", { children: "Mobile" }),
                    /* @__PURE__ */ jsx("span", { className: "text-[10px] opacity-70", children: "375px" })
                  ] }),
                  /* @__PURE__ */ jsxs(ToggleGroupItem, { value: "tablet", className: "text-xs h-auto py-1.5 px-2 data-[state=on]:bg-violet-600 data-[state=on]:text-white flex flex-col items-center gap-0.5 leading-tight", children: [
                    /* @__PURE__ */ jsx("span", { children: "Tablet" }),
                    /* @__PURE__ */ jsx("span", { className: "text-[10px] opacity-70", children: "768px" })
                  ] }),
                  /* @__PURE__ */ jsxs(ToggleGroupItem, { value: "desktop", className: "text-xs h-auto py-1.5 px-2 data-[state=on]:bg-violet-600 data-[state=on]:text-white flex flex-col items-center gap-0.5 leading-tight", children: [
                    /* @__PURE__ */ jsx("span", { children: "Desktop" }),
                    /* @__PURE__ */ jsx("span", { className: "text-[10px] opacity-70", children: "1440px" })
                  ] }),
                  /* @__PURE__ */ jsxs(ToggleGroupItem, { value: "ultra", className: "text-xs h-auto py-1.5 px-2 data-[state=on]:bg-violet-600 data-[state=on]:text-white flex flex-col items-center gap-0.5 leading-tight", children: [
                    /* @__PURE__ */ jsx("span", { children: "Ultra" }),
                    /* @__PURE__ */ jsx("span", { className: "text-[10px] opacity-70", children: "1920px" })
                  ] })
                ] }),
                /* @__PURE__ */ jsx("p", { className: "text-xs text-slate-500", children: "🔧 Define max-width do container" })
              ] }) })
            ] }),
            /* @__PURE__ */ jsxs(AccordionItem, { value: "spacing-x", className: "border-b border-slate-100", children: [
              /* @__PURE__ */ jsx(AccordionTrigger, { className: "px-4 py-2.5 hover:bg-blue-50/50 text-xs font-semibold", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
                /* @__PURE__ */ jsx(ArrowLeftRight, { size: 14, className: "text-blue-600" }),
                /* @__PURE__ */ jsx("span", { children: "Spacing X" }),
                /* @__PURE__ */ jsx("span", { className: "text-xs bg-blue-100 text-blue-700 px-1.5 py-0.5 rounded-full font-bold", children: "Horizontal" })
              ] }) }),
              /* @__PURE__ */ jsx(AccordionContent, { className: "px-4 pb-3", children: /* @__PURE__ */ jsxs("div", { className: "space-y-3", children: [
                /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 p-2.5 bg-blue-50/50 rounded-lg border border-blue-100", children: [
                  /* @__PURE__ */ jsxs(Label, { className: "text-xs font-semibold text-blue-900 flex items-center gap-1.5 whitespace-nowrap", children: [
                    /* @__PURE__ */ jsx("div", { className: "w-2.5 h-2.5 bg-blue-500 rounded" }),
                    "Gap X"
                  ] }),
                  /* @__PURE__ */ jsx(
                    Slider,
                    {
                      value: [componentGutter],
                      onValueChange: ([val]) => {
                        setComponent({
                          gutter: { ...component.gutter, x: val }
                        });
                        setComponentGutter(val);
                      },
                      min: 0,
                      max: 64,
                      step: 4,
                      className: "flex-1 [&_[role=slider]]:bg-blue-600 [&_[role=slider]]:border-blue-700"
                    }
                  ),
                  /* @__PURE__ */ jsxs("span", { className: "text-xs font-mono font-bold text-blue-700 bg-blue-100 px-2 py-0.5 rounded whitespace-nowrap", children: [
                    componentGutter,
                    "px"
                  ] })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 p-2.5 bg-green-50/50 rounded-lg border border-green-100", children: [
                  /* @__PURE__ */ jsxs(Label, { className: "text-xs font-semibold text-green-900 flex items-center gap-1.5 whitespace-nowrap", children: [
                    /* @__PURE__ */ jsx("div", { className: "w-2.5 h-2.5 bg-green-500 rounded" }),
                    "Padding L/R"
                  ] }),
                  /* @__PURE__ */ jsx(
                    Slider,
                    {
                      value: [componentPadding],
                      onValueChange: ([val]) => setComponentPadding(val),
                      min: 0,
                      max: 96,
                      step: 4,
                      className: "flex-1 [&_[role=slider]]:bg-green-600 [&_[role=slider]]:border-green-700"
                    }
                  ),
                  /* @__PURE__ */ jsxs("span", { className: "text-xs font-mono font-bold text-green-700 bg-green-100 px-2 py-0.5 rounded whitespace-nowrap", children: [
                    componentPadding,
                    "px"
                  ] })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 p-2.5 bg-orange-50/50 rounded-lg border border-orange-100", children: [
                  /* @__PURE__ */ jsxs(Label, { className: "text-xs font-semibold text-orange-900 flex items-center gap-1.5 whitespace-nowrap", children: [
                    /* @__PURE__ */ jsx("div", { className: "w-2.5 h-2.5 border-2 border-dashed border-orange-500 rounded" }),
                    "Margin"
                  ] }),
                  /* @__PURE__ */ jsx(
                    Slider,
                    {
                      value: [componentMargin],
                      onValueChange: ([val]) => setComponentMargin(val),
                      min: 0,
                      max: 96,
                      step: 4,
                      className: "flex-1 [&_[role=slider]]:bg-orange-600 [&_[role=slider]]:border-orange-700"
                    }
                  ),
                  /* @__PURE__ */ jsxs("span", { className: "text-xs font-mono font-bold text-orange-700 bg-orange-100 px-2 py-0.5 rounded whitespace-nowrap", children: [
                    componentMargin,
                    "px"
                  ] })
                ] })
              ] }) })
            ] }),
            /* @__PURE__ */ jsxs(AccordionItem, { value: "spacing-y", className: "border-0", children: [
              /* @__PURE__ */ jsx(AccordionTrigger, { className: "px-4 py-2.5 hover:bg-rose-50/50 text-xs font-semibold", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
                /* @__PURE__ */ jsx(ArrowUpDown, { size: 14, className: "text-rose-600" }),
                /* @__PURE__ */ jsx("span", { children: "Spacing Y" }),
                /* @__PURE__ */ jsx("span", { className: "text-xs bg-rose-100 text-rose-700 px-1.5 py-0.5 rounded-full font-bold", children: "Vertical" })
              ] }) }),
              /* @__PURE__ */ jsx(AccordionContent, { className: "px-4 pb-3", children: /* @__PURE__ */ jsxs("div", { className: "space-y-3", children: [
                /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 p-2.5 bg-blue-50/50 rounded-lg border border-blue-100", children: [
                  /* @__PURE__ */ jsxs(Label, { className: "text-xs font-semibold text-blue-900 flex items-center gap-1.5 whitespace-nowrap", children: [
                    /* @__PURE__ */ jsx("div", { className: "w-2.5 h-2.5 bg-blue-500 rounded" }),
                    "Gap Y"
                  ] }),
                  /* @__PURE__ */ jsx(
                    Slider,
                    {
                      value: [componentGutterY],
                      onValueChange: ([val]) => setComponentGutterY(val),
                      min: 0,
                      max: 64,
                      step: 4,
                      className: "flex-1 [&_[role=slider]]:bg-blue-600 [&_[role=slider]]:border-blue-700"
                    }
                  ),
                  /* @__PURE__ */ jsxs("span", { className: "text-xs font-mono font-bold text-blue-700 bg-blue-100 px-2 py-0.5 rounded whitespace-nowrap", children: [
                    componentGutterY,
                    "px"
                  ] })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 p-2.5 bg-green-50/50 rounded-lg border border-green-100", children: [
                  /* @__PURE__ */ jsxs(Label, { className: "text-xs font-semibold text-green-900 flex items-center gap-1.5 whitespace-nowrap", children: [
                    /* @__PURE__ */ jsx("div", { className: "w-2.5 h-2.5 bg-green-500 rounded" }),
                    "Padding T/B"
                  ] }),
                  /* @__PURE__ */ jsx(
                    Slider,
                    {
                      value: [componentPaddingY],
                      onValueChange: ([val]) => setComponentPaddingY(val),
                      min: 0,
                      max: 96,
                      step: 4,
                      className: "flex-1 [&_[role=slider]]:bg-green-600 [&_[role=slider]]:border-green-700"
                    }
                  ),
                  /* @__PURE__ */ jsxs("span", { className: "text-xs font-mono font-bold text-green-700 bg-green-100 px-2 py-0.5 rounded whitespace-nowrap", children: [
                    componentPaddingY,
                    "px"
                  ] })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 p-2.5 bg-orange-50/50 rounded-lg border border-orange-100", children: [
                  /* @__PURE__ */ jsxs(Label, { className: "text-xs font-semibold text-orange-900 flex items-center gap-1.5 whitespace-nowrap", children: [
                    /* @__PURE__ */ jsx("div", { className: "w-2.5 h-2.5 border-2 border-dashed border-orange-500 rounded" }),
                    "Margin Y"
                  ] }),
                  /* @__PURE__ */ jsx(
                    Slider,
                    {
                      value: [componentMarginY],
                      onValueChange: ([val]) => setComponentMarginY(val),
                      min: 0,
                      max: 96,
                      step: 4,
                      className: "flex-1 [&_[role=slider]]:bg-orange-600 [&_[role=slider]]:border-orange-700"
                    }
                  ),
                  /* @__PURE__ */ jsxs("span", { className: "text-xs font-mono font-bold text-orange-700 bg-orange-100 px-2 py-0.5 rounded whitespace-nowrap", children: [
                    componentMarginY,
                    "px"
                  ] })
                ] })
              ] }) })
            ] })
          ] }) }),
          /* @__PURE__ */ jsxs(TabsContent, { value: "overlay", className: "p-0 m-0 flex-1 overflow-y-auto animate-in fade-in-0 slide-in-from-bottom-2 duration-300", children: [
            isEditingElement && /* @__PURE__ */ jsxs("div", { className: "mx-4 mt-4 mb-3 p-3 bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-400 rounded-lg", children: [
              /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 mb-1", children: [
                /* @__PURE__ */ jsx("div", { className: "w-2 h-2 bg-green-500 rounded-full animate-pulse" }),
                /* @__PURE__ */ jsx("span", { className: "text-xs font-bold text-green-900", children: "EDITING ELEMENT GRID" })
              ] }),
              /* @__PURE__ */ jsxs("p", { className: "text-xs text-green-700", children: [
                "🎯 ",
                /* @__PURE__ */ jsx("strong", { children: selectedElementInfo == null ? void 0 : selectedElementInfo.tagName }),
                " #",
                selectedElementInfo == null ? void 0 : selectedElementInfo.id
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "flex gap-2 mt-2 text-[10px] font-mono", children: [
                /* @__PURE__ */ jsxs("span", { className: "bg-blue-100 text-blue-700 px-1.5 py-0.5 rounded", children: [
                  gridColumns,
                  " cols"
                ] }),
                /* @__PURE__ */ jsxs("span", { className: "bg-blue-100 text-blue-700 px-1.5 py-0.5 rounded", children: [
                  gridGutter,
                  "px gutter"
                ] }),
                /* @__PURE__ */ jsxs("span", { className: "bg-orange-100 text-orange-700 px-1.5 py-0.5 rounded", children: [
                  gridMargin,
                  "px margin"
                ] })
              ] }),
              /* @__PURE__ */ jsx("p", { className: "text-xs text-green-600 mt-2", children: "Changes apply only to this element" })
            ] }),
            /* @__PURE__ */ jsxs(Accordion, { type: "multiple", defaultValue: ["overlay-spacing-x", "overlay-spacing-y"], className: "w-full", children: [
              /* @__PURE__ */ jsxs(AccordionItem, { value: "overlay-spacing-x", className: "border-b border-slate-100", children: [
                /* @__PURE__ */ jsx(AccordionTrigger, { className: "px-4 py-2.5 hover:bg-blue-50/50 text-xs font-semibold", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
                  /* @__PURE__ */ jsx(ArrowLeftRight, { size: 14, className: "text-blue-600" }),
                  /* @__PURE__ */ jsx("span", { children: "Overlay X" }),
                  /* @__PURE__ */ jsx("span", { className: "text-xs bg-blue-100 text-blue-700 px-1.5 py-0.5 rounded-full font-bold", children: "Horizontal" })
                ] }) }),
                /* @__PURE__ */ jsx(AccordionContent, { className: "px-4 pb-3", children: /* @__PURE__ */ jsxs("div", { className: "space-y-3", children: [
                  /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 p-2.5 bg-blue-50/50 rounded-lg border border-blue-100", children: [
                    /* @__PURE__ */ jsxs(Label, { className: "text-xs font-semibold text-blue-900 flex items-center gap-1.5 whitespace-nowrap", children: [
                      /* @__PURE__ */ jsx("div", { className: "w-2.5 h-2.5 bg-blue-500 rounded" }),
                      "Gap X"
                    ] }),
                    /* @__PURE__ */ jsx(
                      Slider,
                      {
                        value: [gridGutter],
                        onValueChange: ([val]) => setGridGutter(val),
                        min: 0,
                        max: 64,
                        step: 4,
                        className: "flex-1 [&_[role=slider]]:bg-blue-600 [&_[role=slider]]:border-blue-700"
                      }
                    ),
                    /* @__PURE__ */ jsxs("span", { className: "text-xs font-mono font-bold text-blue-700 bg-blue-100 px-2 py-0.5 rounded whitespace-nowrap", children: [
                      gridGutter,
                      "px"
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 p-2.5 bg-green-50/50 rounded-lg border border-green-100", children: [
                    /* @__PURE__ */ jsxs(Label, { className: "text-xs font-semibold text-green-900 flex items-center gap-1.5 whitespace-nowrap", children: [
                      /* @__PURE__ */ jsx("div", { className: "w-2.5 h-2.5 bg-green-500 rounded" }),
                      "Padding X"
                    ] }),
                    /* @__PURE__ */ jsx(
                      Slider,
                      {
                        value: [gridPadding],
                        onValueChange: ([val]) => setGridPadding(val),
                        min: 0,
                        max: 96,
                        step: 4,
                        className: "flex-1 [&_[role=slider]]:bg-green-600 [&_[role=slider]]:border-green-700"
                      }
                    ),
                    /* @__PURE__ */ jsxs("span", { className: "text-xs font-mono font-bold text-green-700 bg-green-100 px-2 py-0.5 rounded whitespace-nowrap", children: [
                      gridPadding,
                      "px"
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 p-2.5 bg-orange-50/50 rounded-lg border border-orange-100", children: [
                    /* @__PURE__ */ jsxs(Label, { className: "text-xs font-semibold text-orange-900 flex items-center gap-1.5 whitespace-nowrap", children: [
                      /* @__PURE__ */ jsx("div", { className: "w-2.5 h-2.5 border-2 border-dashed border-orange-500 rounded" }),
                      "Margin X"
                    ] }),
                    /* @__PURE__ */ jsx(
                      Slider,
                      {
                        value: [gridMargin],
                        onValueChange: ([val]) => setGridMargin(val),
                        min: 0,
                        max: 96,
                        step: 4,
                        className: "flex-1 [&_[role=slider]]:bg-orange-600 [&_[role=slider]]:border-orange-700"
                      }
                    ),
                    /* @__PURE__ */ jsxs("span", { className: "text-xs font-mono font-bold text-orange-700 bg-orange-100 px-2 py-0.5 rounded whitespace-nowrap", children: [
                      gridMargin,
                      "px"
                    ] })
                  ] })
                ] }) })
              ] }),
              /* @__PURE__ */ jsxs(AccordionItem, { value: "overlay-spacing-y", className: "border-0", children: [
                /* @__PURE__ */ jsx(AccordionTrigger, { className: "px-4 py-2.5 hover:bg-rose-50/50 text-xs font-semibold", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
                  /* @__PURE__ */ jsx(ArrowUpDown, { size: 14, className: "text-rose-600" }),
                  /* @__PURE__ */ jsx("span", { children: "Overlay Y" }),
                  /* @__PURE__ */ jsx("span", { className: "text-xs bg-rose-100 text-rose-700 px-1.5 py-0.5 rounded-full font-bold", children: "Vertical" })
                ] }) }),
                /* @__PURE__ */ jsx(AccordionContent, { className: "px-4 pb-3", children: /* @__PURE__ */ jsxs("div", { className: "space-y-3", children: [
                  /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 p-2.5 bg-blue-50/50 rounded-lg border border-blue-100", children: [
                    /* @__PURE__ */ jsxs(Label, { className: "text-xs font-semibold text-blue-900 flex items-center gap-1.5 whitespace-nowrap", children: [
                      /* @__PURE__ */ jsx("div", { className: "w-2.5 h-2.5 bg-blue-500 rounded" }),
                      "Gap Y"
                    ] }),
                    /* @__PURE__ */ jsx(
                      Slider,
                      {
                        value: [gridGutterY],
                        onValueChange: ([val]) => setGridGutterY(val),
                        min: 0,
                        max: 64,
                        step: 4,
                        className: "flex-1 [&_[role=slider]]:bg-blue-600 [&_[role=slider]]:border-blue-700"
                      }
                    ),
                    /* @__PURE__ */ jsxs("span", { className: "text-xs font-mono font-bold text-blue-700 bg-blue-100 px-2 py-0.5 rounded whitespace-nowrap", children: [
                      gridGutterY,
                      "px"
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 p-2.5 bg-green-50/50 rounded-lg border border-green-100", children: [
                    /* @__PURE__ */ jsxs(Label, { className: "text-xs font-semibold text-green-900 flex items-center gap-1.5 whitespace-nowrap", children: [
                      /* @__PURE__ */ jsx("div", { className: "w-2.5 h-2.5 bg-green-500 rounded" }),
                      "Padding Y"
                    ] }),
                    /* @__PURE__ */ jsx(
                      Slider,
                      {
                        value: [gridPaddingY],
                        onValueChange: ([val]) => setGridPaddingY(val),
                        min: 0,
                        max: 96,
                        step: 4,
                        className: "flex-1 [&_[role=slider]]:bg-green-600 [&_[role=slider]]:border-green-700"
                      }
                    ),
                    /* @__PURE__ */ jsxs("span", { className: "text-xs font-mono font-bold text-green-700 bg-green-100 px-2 py-0.5 rounded whitespace-nowrap", children: [
                      gridPaddingY,
                      "px"
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 p-2.5 bg-orange-50/50 rounded-lg border border-orange-100", children: [
                    /* @__PURE__ */ jsxs(Label, { className: "text-xs font-semibold text-orange-900 flex items-center gap-1.5 whitespace-nowrap", children: [
                      /* @__PURE__ */ jsx("div", { className: "w-2.5 h-2.5 border-2 border-dashed border-orange-500 rounded" }),
                      "Margin Y"
                    ] }),
                    /* @__PURE__ */ jsx(
                      Slider,
                      {
                        value: [gridMarginY],
                        onValueChange: ([val]) => setGridMarginY(val),
                        min: 0,
                        max: 96,
                        step: 4,
                        className: "flex-1 [&_[role=slider]]:bg-orange-600 [&_[role=slider]]:border-orange-700"
                      }
                    ),
                    /* @__PURE__ */ jsxs("span", { className: "text-xs font-mono font-bold text-orange-700 bg-orange-100 px-2 py-0.5 rounded whitespace-nowrap", children: [
                      gridMarginY,
                      "px"
                    ] })
                  ] })
                ] }) })
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsx(TabsContent, { value: "visibility", className: "p-0 m-0 flex-1 overflow-y-auto animate-in fade-in-0 slide-in-from-bottom-2 duration-300", children: /* @__PURE__ */ jsxs(Accordion, { type: "multiple", defaultValue: ["visibility-main", "visibility-layers", "element-grid-visibility"], className: "w-full", children: [
            isEditingElement && /* @__PURE__ */ jsxs(AccordionItem, { value: "element-grid-visibility", className: "border-b border-slate-100 bg-green-50/30", children: [
              /* @__PURE__ */ jsx(AccordionTrigger, { className: "px-4 py-2.5 hover:bg-green-100/50 text-xs font-semibold", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
                /* @__PURE__ */ jsx("div", { className: "w-2 h-2 bg-green-500 rounded-full animate-pulse" }),
                /* @__PURE__ */ jsx("span", { className: "text-green-900", children: "Element Grid Visibility" })
              ] }) }),
              /* @__PURE__ */ jsx(AccordionContent, { className: "px-4 pb-3", children: /* @__PURE__ */ jsxs("div", { className: "space-y-3", children: [
                /* @__PURE__ */ jsx("div", { className: "p-2 bg-green-100 border border-green-300 rounded-lg", children: /* @__PURE__ */ jsxs("p", { className: "text-xs text-green-800 font-semibold mb-2", children: [
                  "🎯 Editing: ",
                  /* @__PURE__ */ jsx("strong", { children: selectedElementInfo == null ? void 0 : selectedElementInfo.tagName }),
                  " #",
                  selectedElementInfo == null ? void 0 : selectedElementInfo.id
                ] }) }),
                /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between p-2 bg-blue-50 rounded-lg border border-blue-200", children: [
                  /* @__PURE__ */ jsx(Label, { htmlFor: "element-show-columns", className: "text-xs font-semibold text-blue-900", children: "Show Columns" }),
                  /* @__PURE__ */ jsx(
                    Switch,
                    {
                      id: "element-show-columns",
                      checked: selectedGridConfig.showColumns,
                      onCheckedChange: (val) => updateSelectedGridConfig({ showColumns: val }),
                      className: "data-[state=checked]:bg-blue-600 data-[state=unchecked]:bg-slate-300"
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between p-2 bg-orange-50 rounded-lg border border-orange-200", children: [
                  /* @__PURE__ */ jsx(Label, { htmlFor: "element-show-margins", className: "text-xs font-semibold text-orange-900", children: "Show Margins" }),
                  /* @__PURE__ */ jsx(
                    Switch,
                    {
                      id: "element-show-margins",
                      checked: selectedGridConfig.showMargins,
                      onCheckedChange: (val) => updateSelectedGridConfig({ showMargins: val }),
                      className: "data-[state=checked]:bg-orange-600 data-[state=unchecked]:bg-slate-300"
                    }
                  )
                ] })
              ] }) })
            ] }),
            /* @__PURE__ */ jsxs(AccordionItem, { value: "visibility-main", className: "border-b border-slate-100", children: [
              /* @__PURE__ */ jsx(AccordionTrigger, { className: "px-4 py-2.5 hover:bg-blue-50/50 text-xs font-semibold", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
                /* @__PURE__ */ jsx(Layers, { size: 14, className: "text-blue-600" }),
                /* @__PURE__ */ jsx("span", { children: "Overlay Settings" })
              ] }) }),
              /* @__PURE__ */ jsx(AccordionContent, { className: "px-4 pb-3", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
                /* @__PURE__ */ jsxs("div", { className: "flex-[0.7] space-y-1.5", children: [
                  /* @__PURE__ */ jsx(Label, { className: "text-xs font-semibold text-slate-700", children: "Opacity" }),
                  /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
                    /* @__PURE__ */ jsx(
                      Slider,
                      {
                        value: [overlayOpacity],
                        onValueChange: ([val]) => setOverlayOpacity(val),
                        min: 0,
                        max: 100,
                        step: 5,
                        className: "flex-1 [&_[role=slider]]:bg-slate-600 [&_[role=slider]]:border-slate-700"
                      }
                    ),
                    /* @__PURE__ */ jsxs("span", { className: "text-xs font-mono font-bold text-slate-700 bg-slate-200 px-2 py-0.5 rounded min-w-[45px] text-center", children: [
                      overlayOpacity,
                      "%"
                    ] })
                  ] })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "flex-[0.3] space-y-1.5", children: [
                  /* @__PURE__ */ jsx(Label, { htmlFor: "show-grid", className: "text-xs font-semibold text-slate-700", children: "Show Overlay" }),
                  /* @__PURE__ */ jsx("div", { className: "flex items-center justify-center", children: /* @__PURE__ */ jsx(
                    Switch,
                    {
                      id: "show-grid",
                      checked: showGrid,
                      onCheckedChange: setShowGrid,
                      className: "data-[state=checked]:bg-blue-600 data-[state=unchecked]:bg-slate-300"
                    }
                  ) })
                ] })
              ] }) })
            ] }),
            showGrid && panelSize === "expanded" && /* @__PURE__ */ jsxs(AccordionItem, { value: "visibility-layers", className: "border-b border-slate-100", children: [
              /* @__PURE__ */ jsx(AccordionTrigger, { className: "px-4 py-2.5 hover:bg-purple-50/50 text-xs font-semibold", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
                /* @__PURE__ */ jsx(Layers, { size: 14, className: "text-purple-600" }),
                /* @__PURE__ */ jsx("span", { children: "Layer Visibility" })
              ] }) }),
              /* @__PURE__ */ jsx(AccordionContent, { className: "px-4 pb-3", children: /* @__PURE__ */ jsxs("div", { className: "space-y-3", children: [
                /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
                  /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 pb-1.5 border-b border-blue-100", children: [
                    /* @__PURE__ */ jsx(ArrowLeftRight, { size: 12, className: "text-blue-600" }),
                    /* @__PURE__ */ jsx("span", { className: "text-xs font-bold text-blue-700", children: "Horizontal (X)" })
                  ] }),
                  /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between p-2 bg-rose-50 rounded-lg border border-rose-200", children: [
                    /* @__PURE__ */ jsxs(Label, { htmlFor: "show-columns", className: "text-xs font-semibold text-rose-900 flex items-center gap-2", children: [
                      /* @__PURE__ */ jsx("div", { className: "w-3 h-3 bg-rose-200/40 border border-rose-400 rounded" }),
                      "Columns"
                    ] }),
                    /* @__PURE__ */ jsx(
                      Switch,
                      {
                        id: "show-columns",
                        checked: showColumns,
                        onCheckedChange: setShowColumns,
                        className: "data-[state=checked]:bg-rose-600 data-[state=unchecked]:bg-slate-300"
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between p-2 bg-green-50 rounded-lg border border-green-200", children: [
                    /* @__PURE__ */ jsxs(Label, { htmlFor: "show-padding", className: "text-xs font-semibold text-green-900 flex items-center gap-2", children: [
                      /* @__PURE__ */ jsx("div", { className: "w-3 h-3 bg-green-200/60 border border-green-400 rounded" }),
                      "Padding L/R"
                    ] }),
                    /* @__PURE__ */ jsx(
                      Switch,
                      {
                        id: "show-padding",
                        checked: showPaddingZonesX,
                        onCheckedChange: setShowPaddingZonesX,
                        className: "data-[state=checked]:bg-green-600 data-[state=unchecked]:bg-slate-300"
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between p-2 bg-orange-50 rounded-lg border border-orange-200", children: [
                    /* @__PURE__ */ jsxs(Label, { htmlFor: "show-margin", className: "text-xs font-semibold text-orange-900 flex items-center gap-2", children: [
                      /* @__PURE__ */ jsx("div", { className: "w-3 h-3 border-2 border-dashed border-orange-500 rounded" }),
                      "Margin L/R"
                    ] }),
                    /* @__PURE__ */ jsx(
                      Switch,
                      {
                        id: "show-margin",
                        checked: showMarginBoundariesX,
                        onCheckedChange: setShowMarginBoundariesX,
                        className: "data-[state=checked]:bg-orange-600 data-[state=unchecked]:bg-slate-300"
                      }
                    )
                  ] })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
                  /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 pb-1.5 border-b border-rose-100", children: [
                    /* @__PURE__ */ jsx(ArrowUpDown, { size: 12, className: "text-rose-600" }),
                    /* @__PURE__ */ jsx("span", { className: "text-xs font-bold text-rose-700", children: "Vertical (Y)" })
                  ] }),
                  /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between p-2 bg-rose-50 rounded-lg border border-rose-200", children: [
                    /* @__PURE__ */ jsxs(Label, { htmlFor: "show-rows", className: "text-xs font-semibold text-rose-900 flex items-center gap-2", children: [
                      /* @__PURE__ */ jsx("div", { className: "w-3 h-3 bg-rose-200/40 border border-rose-400 rounded" }),
                      "Rows"
                    ] }),
                    /* @__PURE__ */ jsx(
                      Switch,
                      {
                        id: "show-rows",
                        checked: showRows,
                        onCheckedChange: setShowRows,
                        className: "data-[state=checked]:bg-rose-600 data-[state=unchecked]:bg-slate-300"
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between p-2 bg-green-50 rounded-lg border border-green-200", children: [
                    /* @__PURE__ */ jsxs(Label, { htmlFor: "show-padding-y", className: "text-xs font-semibold text-green-900 flex items-center gap-2", children: [
                      /* @__PURE__ */ jsx("div", { className: "w-3 h-3 bg-green-500 rounded" }),
                      "Padding T/B"
                    ] }),
                    /* @__PURE__ */ jsx(
                      Switch,
                      {
                        id: "show-padding-y",
                        checked: showPaddingZonesY,
                        onCheckedChange: setShowPaddingZonesY,
                        className: "data-[state=checked]:bg-green-600 data-[state=unchecked]:bg-slate-300"
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between p-2 bg-orange-50 rounded-lg border border-orange-200", children: [
                    /* @__PURE__ */ jsxs(Label, { htmlFor: "show-margin-y", className: "text-xs font-semibold text-orange-900 flex items-center gap-2", children: [
                      /* @__PURE__ */ jsx("div", { className: "w-3 h-3 border-2 border-dashed border-orange-500 rounded" }),
                      "Margin T/B"
                    ] }),
                    /* @__PURE__ */ jsx(
                      Switch,
                      {
                        id: "show-margin-y",
                        checked: showMarginBoundariesY,
                        onCheckedChange: setShowMarginBoundariesY,
                        className: "data-[state=checked]:bg-orange-600 data-[state=unchecked]:bg-slate-300"
                      }
                    )
                  ] })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
                  /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 pb-1.5 border-b border-violet-100", children: [
                    /* @__PURE__ */ jsx(ArrowUpDown, { size: 12, className: "text-violet-600" }),
                    /* @__PURE__ */ jsx("span", { className: "text-xs font-bold text-violet-700", children: "Baseline Grid" })
                  ] }),
                  /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between p-2 bg-violet-50 rounded-lg border border-violet-200", children: [
                    /* @__PURE__ */ jsxs(Label, { htmlFor: "show-baseline", className: "text-xs font-semibold text-violet-900 flex items-center gap-2", children: [
                      /* @__PURE__ */ jsx("div", { className: "w-3 h-3 border border-violet-400 rounded", style: { backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(139, 92, 246, 0.3) 3px, rgba(139, 92, 246, 0.3) 4px)" } }),
                      "Grid Lines (",
                      baselineGrid,
                      ")"
                    ] }),
                    /* @__PURE__ */ jsx(
                      Switch,
                      {
                        id: "show-baseline",
                        checked: showBaselineGrid,
                        onCheckedChange: setShowBaselineGrid,
                        className: "data-[state=checked]:bg-violet-600 data-[state=unchecked]:bg-slate-300"
                      }
                    )
                  ] })
                ] }),
                /* @__PURE__ */ jsx("p", { className: "text-xs text-slate-500 pt-2", children: "🔧 Controla quais camadas do overlay são visíveis em cada eixo" })
              ] }) })
            ] })
          ] }) }),
          /* @__PURE__ */ jsx(TabsContent, { value: "advanced", className: "p-0 m-0 flex-1 overflow-y-auto animate-in fade-in-0 slide-in-from-bottom-2 duration-300", children: /* @__PURE__ */ jsxs(Accordion, { type: "multiple", defaultValue: ["advanced-brand"], className: "w-full", children: [
            /* @__PURE__ */ jsxs(AccordionItem, { value: "advanced-brand", className: "border-b border-slate-100", children: [
              /* @__PURE__ */ jsx(AccordionTrigger, { className: "px-4 py-2.5 hover:bg-pink-50/50 text-xs font-semibold", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
                /* @__PURE__ */ jsx(Palette, { size: 14, className: "text-pink-600" }),
                /* @__PURE__ */ jsx("span", { children: "Brand DSS" }),
                brand && /* @__PURE__ */ jsx(
                  "span",
                  {
                    className: "ml-auto text-[10px] font-bold px-2 py-0.5 rounded-full text-white",
                    style: { background: brand === "hub" ? "#ef7a11" : brand === "water" ? "#0e88e4" : "#0b8154" },
                    children: brand.toUpperCase()
                  }
                )
              ] }) }),
              /* @__PURE__ */ jsx(AccordionContent, { className: "px-4 pb-3", children: /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
                /* @__PURE__ */ jsx(Label, { className: "text-xs font-semibold text-slate-700", children: "Sansys Brand" }),
                /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-1.5", children: [
                  /* @__PURE__ */ jsx(
                    "button",
                    {
                      onClick: () => setBrand(void 0),
                      className: `py-2 px-3 text-xs font-bold rounded-lg transition-all border-2 col-span-2 ${!brand ? "bg-slate-200 text-slate-800 border-slate-400" : "bg-white text-slate-500 border-slate-200 hover:border-slate-300 hover:bg-slate-50"}`,
                      children: "None (brand-agnostic)"
                    }
                  ),
                  /* @__PURE__ */ jsx(
                    "button",
                    {
                      onClick: () => setBrand("hub"),
                      className: `py-2 px-3 text-xs font-bold rounded-lg transition-all border-2 ${brand === "hub" ? "text-white border-[#ef7a11]" : "bg-white text-[#ef7a11] border-[#ef7a11]/40 hover:border-[#ef7a11] hover:bg-orange-50"}`,
                      style: brand === "hub" ? { background: "#ef7a11" } : {},
                      children: "Hub (Orange)"
                    }
                  ),
                  /* @__PURE__ */ jsx(
                    "button",
                    {
                      onClick: () => setBrand("water"),
                      className: `py-2 px-3 text-xs font-bold rounded-lg transition-all border-2 ${brand === "water" ? "text-white border-[#0e88e4]" : "bg-white text-[#0e88e4] border-[#0e88e4]/40 hover:border-[#0e88e4] hover:bg-blue-50"}`,
                      style: brand === "water" ? { background: "#0e88e4" } : {},
                      children: "Water (Blue)"
                    }
                  ),
                  /* @__PURE__ */ jsx(
                    "button",
                    {
                      onClick: () => setBrand("waste"),
                      className: `py-2 px-3 text-xs font-bold rounded-lg transition-all border-2 col-span-2 ${brand === "waste" ? "text-white border-[#0b8154]" : "bg-white text-[#0b8154] border-[#0b8154]/40 hover:border-[#0b8154] hover:bg-green-50"}`,
                      style: brand === "waste" ? { background: "#0b8154" } : {},
                      children: "Waste (Green)"
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxs("p", { className: "text-xs text-slate-500", children: [
                  "Define ",
                  /* @__PURE__ */ jsx("code", { className: "font-mono bg-slate-100 px-1 rounded", children: "data-brand" }),
                  " em",
                  " ",
                  /* @__PURE__ */ jsx("code", { className: "font-mono bg-slate-100 px-1 rounded", children: "<html>" }),
                  " e habilita validação de tokens de cor por marca."
                ] })
              ] }) })
            ] }),
            /* @__PURE__ */ jsxs(AccordionItem, { value: "advanced-grid", className: "border-b border-slate-100", children: [
              /* @__PURE__ */ jsx(AccordionTrigger, { className: "px-4 py-2.5 hover:bg-indigo-50/50 text-xs font-semibold", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
                /* @__PURE__ */ jsx(Grid3x3, { size: 14, className: "text-indigo-600" }),
                /* @__PURE__ */ jsx("span", { children: "Advanced Grid" })
              ] }) }),
              /* @__PURE__ */ jsx(AccordionContent, { className: "px-4 pb-3", children: /* @__PURE__ */ jsxs("div", { className: "space-y-3", children: [
                /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between p-2 bg-indigo-50 rounded-lg border border-indigo-200", children: [
                  /* @__PURE__ */ jsxs("div", { children: [
                    /* @__PURE__ */ jsx(Label, { htmlFor: "nested-grid", className: "text-xs font-semibold text-indigo-900", children: "🎯 Selection Mode" }),
                    /* @__PURE__ */ jsx("p", { className: "text-xs text-indigo-700", children: "Clique para selecionar elementos" })
                  ] }),
                  /* @__PURE__ */ jsx(
                    Switch,
                    {
                      id: "nested-grid",
                      checked: isSelectionMode,
                      onCheckedChange: setIsSelectionMode,
                      className: "data-[state=checked]:bg-indigo-600 data-[state=unchecked]:bg-slate-300"
                    }
                  )
                ] }),
                isSelectionMode && selectedElementInfo && /* @__PURE__ */ jsxs("div", { className: "p-3 bg-green-50 border border-green-200 rounded-lg space-y-1", children: [
                  /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 mb-2", children: [
                    /* @__PURE__ */ jsx("div", { className: "w-2 h-2 bg-green-500 rounded-full animate-pulse" }),
                    /* @__PURE__ */ jsx("span", { className: "text-xs font-bold text-green-900", children: "ELEMENTO SELECIONADO" })
                  ] }),
                  /* @__PURE__ */ jsxs("p", { className: "text-xs text-green-800", children: [
                    /* @__PURE__ */ jsx("strong", { children: "Tag:" }),
                    " <",
                    selectedElementInfo.tagName,
                    ">"
                  ] }),
                  /* @__PURE__ */ jsxs("p", { className: "text-xs text-green-800", children: [
                    /* @__PURE__ */ jsx("strong", { children: "ID:" }),
                    " ",
                    selectedElementInfo.id
                  ] }),
                  /* @__PURE__ */ jsxs("p", { className: "text-xs text-green-800 break-all", children: [
                    /* @__PURE__ */ jsx("strong", { children: "Class:" }),
                    " ",
                    selectedElementInfo.className.substring(0, 50),
                    "..."
                  ] })
                ] }),
                isSelectionMode && !selectedElementInfo && /* @__PURE__ */ jsx("div", { className: "p-3 bg-blue-50 border border-blue-200 rounded-lg", children: /* @__PURE__ */ jsx("p", { className: "text-xs text-blue-700", children: "👆 Clique em qualquer elemento da página para inspecioná-lo" }) }),
                /* @__PURE__ */ jsx("p", { className: "text-xs text-slate-500", children: "🔧 Ativa modo de seleção para manipular elementos específicos" })
              ] }) })
            ] }),
            /* @__PURE__ */ jsxs(AccordionItem, { value: "advanced-baseline", className: "border-b border-slate-100", children: [
              /* @__PURE__ */ jsx(AccordionTrigger, { className: "px-4 py-2.5 hover:bg-violet-50/50 text-xs font-semibold", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
                /* @__PURE__ */ jsx(ArrowUpDown, { size: 14, className: "text-violet-600" }),
                /* @__PURE__ */ jsx("span", { children: "Baseline Grid" })
              ] }) }),
              /* @__PURE__ */ jsx(AccordionContent, { className: "px-4 pb-3", children: /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
                /* @__PURE__ */ jsx(Label, { className: "text-xs font-semibold text-slate-700", children: "Grid Size" }),
                /* @__PURE__ */ jsxs(ToggleGroup, { type: "single", value: baselineGrid, onValueChange: (v) => v && setBaselineGrid(v), className: "grid grid-cols-2 gap-1.5", children: [
                  /* @__PURE__ */ jsx(ToggleGroupItem, { value: "4px", className: "text-xs h-8 data-[state=on]:bg-violet-600 data-[state=on]:text-white", children: "4px" }),
                  /* @__PURE__ */ jsx(ToggleGroupItem, { value: "8px", className: "text-xs h-8 data-[state=on]:bg-violet-600 data-[state=on]:text-white", children: "8px" })
                ] }),
                /* @__PURE__ */ jsx("p", { className: "text-xs text-slate-500", children: "🔧 Grid de linhas horizontais para alinhamento vertical" })
              ] }) })
            ] }),
            /* @__PURE__ */ jsxs(AccordionItem, { value: "advanced-density", className: "border-0", children: [
              /* @__PURE__ */ jsx(AccordionTrigger, { className: "px-4 py-2.5 hover:bg-emerald-50/50 text-xs font-semibold", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
                /* @__PURE__ */ jsx(Layers, { size: 14, className: "text-emerald-600" }),
                /* @__PURE__ */ jsx("span", { children: "Density Mode" })
              ] }) }),
              /* @__PURE__ */ jsx(AccordionContent, { className: "px-4 pb-3", children: /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
                /* @__PURE__ */ jsx(Label, { className: "text-xs font-semibold text-slate-700", children: "Spacing Density" }),
                /* @__PURE__ */ jsxs(ToggleGroup, { type: "single", value: densityMode, onValueChange: (v) => v && setDensityMode(v), className: "grid grid-cols-3 gap-1.5", children: [
                  /* @__PURE__ */ jsx(ToggleGroupItem, { value: "comfortable", className: "text-xs h-8 data-[state=on]:bg-emerald-600 data-[state=on]:text-white", children: "Comfort" }),
                  /* @__PURE__ */ jsx(ToggleGroupItem, { value: "compact", className: "text-xs h-8 data-[state=on]:bg-emerald-600 data-[state=on]:text-white", children: "Compact" }),
                  /* @__PURE__ */ jsx(ToggleGroupItem, { value: "dense", className: "text-xs h-8 data-[state=on]:bg-emerald-600 data-[state=on]:text-white", children: "Dense" })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "p-2 bg-emerald-50 rounded border border-emerald-200", children: [
                  /* @__PURE__ */ jsx("p", { className: "text-xs text-emerald-900 font-semibold", children: "Multiplier:" }),
                  /* @__PURE__ */ jsxs("p", { className: "text-xs text-emerald-700", children: [
                    densityMode === "comfortable" && "100% (padrão)",
                    densityMode === "compact" && "75% (reduzido)",
                    densityMode === "dense" && "50% (denso)"
                  ] })
                ] }),
                /* @__PURE__ */ jsx("p", { className: "text-xs text-slate-500", children: "🔧 Aplica multiplicador global em todos os spacings" })
              ] }) })
            ] })
          ] }) }),
          /* @__PURE__ */ jsxs(TabsContent, { value: "alerts", className: "p-0 m-0 flex-1 overflow-y-auto animate-in fade-in-0 slide-in-from-bottom-2 duration-300", children: [
            violations.length === 0 ? /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center justify-center gap-3 p-8 text-center", children: [
              /* @__PURE__ */ jsx(CircleCheckBig, { size: 32, className: "text-emerald-500" }),
              /* @__PURE__ */ jsx("p", { className: "text-sm font-bold text-emerald-700", children: "Nenhum erro detectado" }),
              /* @__PURE__ */ jsx("p", { className: "text-xs text-slate-500", children: "Todos os valores estão dentro dos tokens DSS" }),
              /* @__PURE__ */ jsxs(
                "button",
                {
                  onClick: exportReport,
                  className: "mt-2 flex items-center gap-1.5 text-[10px] font-semibold text-slate-500 hover:text-emerald-700 hover:bg-emerald-50 px-3 py-1.5 rounded-lg border border-slate-200 hover:border-emerald-200 transition-all",
                  children: [
                    /* @__PURE__ */ jsx(Download, { size: 11 }),
                    "Exportar relatório"
                  ]
                }
              )
            ] }) : /* @__PURE__ */ jsxs("div", { className: "p-3 space-y-2", children: [
              /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between mb-1", children: [
                /* @__PURE__ */ jsxs("p", { className: "text-xs font-bold text-slate-700", children: [
                  violations.length,
                  " ",
                  violations.length === 1 ? "problema" : "problemas",
                  " detectado",
                  violations.length !== 1 ? "s" : ""
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
                  highlightedElementIndex !== null && /* @__PURE__ */ jsx(
                    "button",
                    {
                      onClick: () => setHighlightedElementIndex(null),
                      className: "text-[10px] text-slate-500 hover:text-slate-700 underline",
                      children: "limpar seleção"
                    }
                  ),
                  /* @__PURE__ */ jsxs(
                    "button",
                    {
                      onClick: exportReport,
                      title: "Exportar relatório JSON",
                      className: "flex items-center gap-1 text-[10px] font-semibold text-slate-600 hover:text-red-700 hover:bg-red-50 px-2 py-1 rounded border border-slate-200 hover:border-red-200 transition-all",
                      children: [
                        /* @__PURE__ */ jsx(Download, { size: 10 }),
                        "Export"
                      ]
                    }
                  )
                ] })
              ] }),
              violations.map((v) => {
                const severityConfig = {
                  critical: { bg: "bg-red-50", border: "border-red-300", text: "text-red-700", badge: "bg-red-500" },
                  high: { bg: "bg-orange-50", border: "border-orange-300", text: "text-orange-700", badge: "bg-orange-500" },
                  medium: { bg: "bg-yellow-50", border: "border-yellow-200", text: "text-yellow-700", badge: "bg-yellow-500" },
                  low: { bg: "bg-blue-50", border: "border-blue-200", text: "text-blue-700", badge: "bg-blue-400" }
                }[v.severity];
                const isActive = v.elementIndex !== void 0 && highlightedElementIndex === v.elementIndex;
                return /* @__PURE__ */ jsx(
                  "div",
                  {
                    className: `p-2.5 rounded-lg border-2 transition-all duration-200 ${severityConfig.bg} ${isActive ? "border-red-500 shadow-md shadow-red-200/50" : severityConfig.border} ${v.elementIndex !== void 0 ? "cursor-pointer hover:shadow-sm" : ""}`,
                    onClick: () => {
                      if (v.elementIndex !== void 0) {
                        setHighlightedElementIndex(isActive ? null : v.elementIndex);
                      }
                    },
                    children: /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-2", children: [
                      /* @__PURE__ */ jsx("span", { className: `mt-0.5 text-[9px] font-bold uppercase px-1.5 py-0.5 rounded text-white flex-shrink-0 ${severityConfig.badge}`, children: v.severity }),
                      /* @__PURE__ */ jsxs("div", { className: "flex-1 min-w-0", children: [
                        /* @__PURE__ */ jsx("p", { className: `text-xs font-semibold ${severityConfig.text} leading-snug`, children: v.message }),
                        v.affectedProperty && /* @__PURE__ */ jsxs("code", { className: "text-[10px] text-slate-500 mt-0.5 block truncate", children: [
                          v.affectedProperty,
                          v.affectedValue !== void 0 ? `: ${v.affectedValue}px` : ""
                        ] }),
                        v.elementIndex !== void 0 && /* @__PURE__ */ jsxs("p", { className: "text-[10px] text-slate-400 mt-1 flex items-center gap-1", children: [
                          /* @__PURE__ */ jsx("span", { children: "↗" }),
                          " Clique para destacar no overlay"
                        ] })
                      ] })
                    ] })
                  },
                  v.id
                );
              }),
              /* @__PURE__ */ jsx("p", { className: "text-[10px] text-slate-400 pt-1 text-center", children: "Tokens DSS válidos: 0, 4, 8, 12, 16, 20, 24, 32, 40, 48, 56, 64px" })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: `px-3 py-2 border-t flex items-center gap-1.5 text-[10px] font-medium ${mcpConnected ? "border-emerald-100 bg-emerald-50 text-emerald-700" : "border-slate-100 bg-slate-50 text-slate-400"}`, children: [
              mcpConnected ? /* @__PURE__ */ jsx(Wifi, { size: 10 }) : /* @__PURE__ */ jsx(WifiOff, { size: 10 }),
              mcpConnected ? "Validação via MCP Server" : "Validação local (MCP offline)"
            ] })
          ] })
        ] }),
        showGrid && /* @__PURE__ */ jsxs("div", { className: "border-t border-slate-200 p-3 bg-gradient-to-br from-slate-50 to-blue-50 flex-shrink-0", children: [
          /* @__PURE__ */ jsxs("div", { className: "text-xs font-bold text-slate-700 mb-2 flex items-center gap-2", children: [
            /* @__PURE__ */ jsx("div", { className: "w-2 h-2 bg-blue-600 rounded-full" }),
            "Color Legend"
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 flex-wrap", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-1.5", children: [
              /* @__PURE__ */ jsx("div", { className: "w-3 h-3 bg-rose-200/40 border-2 border-rose-400 rounded" }),
              /* @__PURE__ */ jsx("span", { className: "text-xs text-slate-700 font-medium", children: "Columns" })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-1.5", children: [
              /* @__PURE__ */ jsx("div", { className: "w-3 h-3 border-2 border-dashed border-green-500 rounded" }),
              /* @__PURE__ */ jsx("span", { className: "text-xs text-slate-700 font-medium", children: "Padding" })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-1.5", children: [
              /* @__PURE__ */ jsx("div", { className: "w-3 h-3 border-2 border-dashed border-orange-500 rounded" }),
              /* @__PURE__ */ jsx("span", { className: "text-xs text-slate-700 font-medium", children: "Margin" })
            ] })
          ] })
        ] })
      ]
    }
  );
}
function GridOverlay({
  columns,
  showAnnotations = false,
  gutter = 24,
  margin = 48,
  padding = 24,
  gutterY = 24,
  marginY = 48,
  paddingY = 24,
  rowHeight: _rowHeight = 80,
  rows: _rows = 8,
  type = "columnar",
  contentRef,
  contentSelector,
  layoutGutterY: _layoutGutterY = 0,
  layoutMarginY: _layoutMarginY = 0,
  showRows = true,
  highlightedElementIndex = null
}) {
  const [overlayOpacity, setOverlayOpacity] = useState(1);
  const [showColumns, setShowColumns] = useState(true);
  const [showGapsX, setShowGapsX] = useState(true);
  const [showGapsY, setShowGapsY] = useState(true);
  const [showPaddingX, setShowPaddingX] = useState(true);
  const [showPaddingY, setShowPaddingY] = useState(true);
  const [showMarginX, setShowMarginX] = useState(true);
  const [showMarginY, setShowMarginY] = useState(true);
  const [containerMaxWidth, setContainerMaxWidth] = useState("1440px");
  const [autoColumnWidth, setAutoColumnWidth] = useState(true);
  const calculateFixedColumnWidth = () => {
    if (autoColumnWidth) return "1fr";
    const breakpointValue = parseInt(containerMaxWidth);
    if (isNaN(breakpointValue)) return "100px";
    const availableWidth = breakpointValue - 2 * margin - (columns - 1) * gutter;
    const columnWidth = availableWidth / columns;
    return `${columnWidth}px`;
  };
  const [contentBounds, setContentBounds] = useState(null);
  const [layoutBounds, setLayoutBounds] = useState(null);
  const [componentRows, setComponentRows] = useState([]);
  useEffect(() => {
    var _a;
    const resolveTarget = () => {
      if (contentRef == null ? void 0 : contentRef.current) return contentRef.current;
      if (contentSelector) return document.querySelector(contentSelector);
      return null;
    };
    const target = resolveTarget();
    if (!target) return;
    const measureComponents = () => {
      const container = resolveTarget();
      if (!container) return;
      const containerRect = container.getBoundingClientRect();
      setContentBounds({
        top: containerRect.top,
        height: containerRect.height,
        left: containerRect.left,
        width: containerRect.width
      });
      const layoutEl2 = container.querySelector("[data-grid-body]");
      if (layoutEl2) {
        const lr = layoutEl2.getBoundingClientRect();
        setLayoutBounds({ top: lr.top, height: lr.height, left: lr.left, width: lr.width });
      } else {
        setLayoutBounds(null);
      }
      let gridElements;
      const markedRowsContainer = container.querySelector("[data-grid-rows]");
      if (markedRowsContainer) {
        gridElements = Array.from(markedRowsContainer.children);
      } else if (contentSelector && !(contentRef == null ? void 0 : contentRef.current)) {
        gridElements = Array.from(container.children);
      } else {
        const firstChild = container.querySelector(":scope > *");
        if (!firstChild) return;
        gridElements = Array.from(firstChild.children);
      }
      if (gridElements.length === 0) return;
      const rowMap = /* @__PURE__ */ new Map();
      const TOLERANCE = 2;
      gridElements.forEach((element) => {
        const rect = element.getBoundingClientRect();
        const relTop = rect.top - containerRect.top;
        let matched;
        for (const [key] of rowMap) {
          if (Math.abs(key - relTop) <= TOLERANCE) {
            matched = key;
            break;
          }
        }
        if (matched === void 0) {
          rowMap.set(relTop, { top: relTop, height: rect.height });
        } else {
          const existing = rowMap.get(matched);
          if (rect.height > existing.height) rowMap.set(matched, { ...existing, height: rect.height });
        }
      });
      setComponentRows(Array.from(rowMap.values()).sort((a, b) => a.top - b.top));
    };
    measureComponents();
    const resizeObserver = new ResizeObserver(measureComponents);
    resizeObserver.observe(target);
    const layoutEl = (_a = resolveTarget()) == null ? void 0 : _a.querySelector("[data-grid-body]");
    if (layoutEl) resizeObserver.observe(layoutEl);
    const timeoutId = setTimeout(measureComponents, 300);
    const onScroll = () => requestAnimationFrame(measureComponents);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      resizeObserver.disconnect();
      clearTimeout(timeoutId);
      window.removeEventListener("scroll", onScroll);
    };
  }, [contentRef, contentSelector]);
  useEffect(() => {
    const updateFromCSSVars = () => {
      if (typeof window === "undefined") return;
      const root = getComputedStyle(document.documentElement);
      const opacity = root.getPropertyValue("--grid-overlay-opacity").trim();
      if (opacity) setOverlayOpacity(parseFloat(opacity) || 1);
      const cols = root.getPropertyValue("--grid-show-columns").trim();
      if (cols) setShowColumns(cols === "1");
      const gapsX = root.getPropertyValue("--grid-show-gaps-x").trim();
      if (gapsX) setShowGapsX(gapsX === "1");
      const gapsY = root.getPropertyValue("--grid-show-gaps-y").trim();
      if (gapsY) setShowGapsY(gapsY === "1");
      const padX = root.getPropertyValue("--grid-show-padding-x").trim();
      if (padX) setShowPaddingX(padX === "1");
      const padY = root.getPropertyValue("--grid-show-padding-y").trim();
      if (padY) {
        setShowPaddingY(padY === "1");
      }
      const marX = root.getPropertyValue("--grid-show-margin-x").trim();
      if (marX) setShowMarginX(marX === "1");
      const marY = root.getPropertyValue("--grid-show-margin-y").trim();
      if (marY) {
        setShowMarginY(marY === "1");
      }
      void root.getPropertyValue("--grid-container-type").trim();
      const breakpoint = root.getPropertyValue("--grid-breakpoint-width").trim();
      if (breakpoint) {
        setContainerMaxWidth(breakpoint);
      } else {
        setContainerMaxWidth("1440px");
      }
      const autoWidth = root.getPropertyValue("--grid-auto-column-width").trim();
      if (autoWidth) {
        setAutoColumnWidth(autoWidth === "1");
      }
    };
    updateFromCSSVars();
    const observer = new MutationObserver(updateFromCSSVars);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["style"]
    });
    return () => observer.disconnect();
  }, []);
  const renderColumnarGrid = () => {
    const outerStyle = contentBounds ? { position: "absolute", top: contentBounds.top, left: 0, right: 0, height: contentBounds.height, pointerEvents: "none" } : { position: "absolute", inset: 0, pointerEvents: "none" };
    const colBounds = layoutBounds || contentBounds;
    const columnAreaStyle = colBounds ? { position: "absolute", top: 0, bottom: 0, left: colBounds.left, width: colBounds.width, pointerEvents: "none" } : { position: "absolute", top: 0, bottom: 0, left: `${margin}px`, right: `${margin}px`, pointerEvents: "none" };
    return /* @__PURE__ */ jsxs("div", { style: outerStyle, children: [
      /* @__PURE__ */ jsx("div", { style: columnAreaStyle, children: /* @__PURE__ */ jsx(
        "div",
        {
          className: "h-full grid relative",
          style: {
            gridTemplateColumns: `repeat(${columns}, ${calculateFixedColumnWidth()})`,
            gap: `${gutter}px`,
            pointerEvents: "none"
          },
          children: Array.from({ length: columns }).map((_, i) => /* @__PURE__ */ jsxs(
            "div",
            {
              className: "relative h-full",
              style: { zIndex: 15, pointerEvents: "none" },
              children: [
                showColumns && /* @__PURE__ */ jsx(
                  "div",
                  {
                    className: "absolute inset-0 transition-all duration-300",
                    style: {
                      backgroundColor: `rgba(251, 207, 232, ${0.4 * overlayOpacity})`,
                      borderColor: `rgba(244, 114, 182, ${0.6 * overlayOpacity})`,
                      borderWidth: "1px",
                      borderStyle: "solid",
                      pointerEvents: "none"
                    },
                    children: showAnnotations && /* @__PURE__ */ jsx(
                      "div",
                      {
                        className: "absolute top-2 left-2 text-xs font-mono font-bold z-10 px-1.5 py-0.5 rounded",
                        style: {
                          backgroundColor: `rgba(255, 255, 255, ${0.8 * overlayOpacity})`,
                          color: `rgba(190, 18, 60, ${overlayOpacity})`,
                          pointerEvents: "none"
                        },
                        children: i + 1
                      }
                    )
                  }
                ),
                showPaddingX && /* @__PURE__ */ jsx(
                  "div",
                  {
                    className: "absolute inset-0 border-dashed transition-all duration-300",
                    style: {
                      margin: `0 ${padding}px`,
                      backgroundColor: `rgba(187, 247, 208, ${0.6 * overlayOpacity})`,
                      borderColor: `rgba(74, 222, 128, ${0.7 * overlayOpacity})`,
                      borderWidth: "1px",
                      borderStyle: "dashed",
                      pointerEvents: "none"
                    },
                    children: showAnnotations && i === 0 && /* @__PURE__ */ jsxs(
                      "div",
                      {
                        className: "absolute -top-5 left-0 text-xs font-mono font-semibold px-1.5 py-0.5 rounded shadow-sm",
                        style: {
                          backgroundColor: `rgba(255, 255, 255, ${0.9 * overlayOpacity})`,
                          color: `rgba(21, 128, 61, ${overlayOpacity})`,
                          pointerEvents: "none"
                        },
                        children: [
                          padding,
                          "px padding"
                        ]
                      }
                    )
                  }
                )
              ]
            },
            i
          ))
        }
      ) }),
      showMarginX && colBounds && margin > 0 && /* @__PURE__ */ jsxs(Fragment, { children: [
        /* @__PURE__ */ jsx(
          "div",
          {
            style: {
              position: "absolute",
              top: 0,
              bottom: 0,
              left: colBounds.left,
              width: margin,
              borderRight: `2px dashed rgba(249,115,22,${0.8 * overlayOpacity})`,
              backgroundColor: `rgba(253,186,116,${0.25 * overlayOpacity})`,
              zIndex: 50,
              pointerEvents: "none"
            },
            children: showAnnotations && /* @__PURE__ */ jsxs("div", { style: { position: "absolute", top: 8, left: "50%", transform: "translateX(-50%)", fontSize: 11, fontFamily: "monospace", fontWeight: 600, background: `rgba(255,255,255,${0.9 * overlayOpacity})`, color: `rgba(194,65,12,${overlayOpacity})`, padding: "2px 6px", borderRadius: 4, whiteSpace: "nowrap", pointerEvents: "none" }, children: [
              margin,
              "px"
            ] })
          }
        ),
        /* @__PURE__ */ jsx(
          "div",
          {
            style: {
              position: "absolute",
              top: 0,
              bottom: 0,
              left: colBounds.left + colBounds.width - margin,
              width: margin,
              borderLeft: `2px dashed rgba(249,115,22,${0.8 * overlayOpacity})`,
              backgroundColor: `rgba(253,186,116,${0.25 * overlayOpacity})`,
              zIndex: 50,
              pointerEvents: "none"
            }
          }
        )
      ] }),
      showMarginY && marginY > 0 && /* @__PURE__ */ jsxs(Fragment, { children: [
        /* @__PURE__ */ jsx("div", { style: { position: "absolute", left: 0, right: 0, top: 0, height: marginY, zIndex: 60, pointerEvents: "none", borderBottom: `2px dashed rgba(249,115,22,${0.8 * overlayOpacity})`, backgroundColor: `rgba(253,186,116,${0.12 * overlayOpacity})` }, children: showAnnotations && /* @__PURE__ */ jsxs("div", { style: { position: "absolute", left: "50%", top: "50%", transform: "translate(-50%,-50%)", fontSize: 11, fontFamily: "monospace", fontWeight: 600, background: `rgba(255,255,255,${0.9 * overlayOpacity})`, color: `rgba(194,65,12,${overlayOpacity})`, padding: "2px 6px", borderRadius: 4, pointerEvents: "none" }, children: [
          marginY,
          "px margin Y"
        ] }) }),
        /* @__PURE__ */ jsx("div", { style: { position: "absolute", left: 0, right: 0, bottom: 0, height: marginY, zIndex: 60, pointerEvents: "none", borderTop: `2px dashed rgba(249,115,22,${0.8 * overlayOpacity})`, backgroundColor: `rgba(253,186,116,${0.12 * overlayOpacity})` } })
      ] }),
      showRows && componentRows.map((row, i) => {
        const isHighlighted = highlightedElementIndex === i;
        return /* @__PURE__ */ jsx(
          "div",
          {
            style: {
              position: "absolute",
              left: 0,
              right: 0,
              pointerEvents: "none",
              top: row.top,
              height: row.height,
              zIndex: isHighlighted ? 30 : 20
            },
            children: /* @__PURE__ */ jsx(
              "div",
              {
                style: {
                  position: "absolute",
                  inset: 0,
                  pointerEvents: "none",
                  backgroundColor: isHighlighted ? `rgba(239,68,68,${0.25 * overlayOpacity})` : `rgba(251,207,232,${0.3 * overlayOpacity})`,
                  borderTop: `${isHighlighted ? 2 : 1}px solid rgba(${isHighlighted ? "239,68,68" : "244,114,182"},${isHighlighted ? 0.9 : 0.5}*${overlayOpacity})`,
                  borderBottom: `${isHighlighted ? 2 : 1}px solid rgba(${isHighlighted ? "239,68,68" : "244,114,182"},${isHighlighted ? 0.9 : 0.5}*${overlayOpacity})`,
                  outline: isHighlighted ? `2px solid rgba(239,68,68,0.8)` : "none"
                },
                children: showAnnotations && /* @__PURE__ */ jsxs("div", { style: { position: "absolute", top: 4, right: 8, fontSize: 11, fontFamily: "monospace", fontWeight: 700, background: `rgba(255,255,255,${0.8 * overlayOpacity})`, color: `rgba(190,18,60,${overlayOpacity})`, padding: "2px 5px", borderRadius: 3, zIndex: 10, pointerEvents: "none" }, children: [
                  "Row ",
                  i + 1
                ] })
              }
            )
          },
          `row-${i}`
        );
      }),
      showPaddingY && paddingY > 0 && componentRows.map((row, i) => /* @__PURE__ */ jsx(
        "div",
        {
          style: { position: "absolute", left: 0, right: 0, pointerEvents: "none", top: row.top, height: row.height, zIndex: 25 },
          children: /* @__PURE__ */ jsx("div", { style: { position: "absolute", inset: `${paddingY}px 0`, pointerEvents: "none", borderTop: `2px dashed rgba(34,197,94,${0.9 * overlayOpacity})`, borderBottom: `2px dashed rgba(34,197,94,${0.9 * overlayOpacity})` }, children: showAnnotations && i === 0 && /* @__PURE__ */ jsxs("div", { style: { position: "absolute", left: 8, top: "50%", transform: "translateY(-50%)", fontSize: 11, fontFamily: "monospace", fontWeight: 600, background: `rgba(255,255,255,${0.95 * overlayOpacity})`, color: `rgba(21,128,61,${overlayOpacity})`, padding: "2px 6px", borderRadius: 4, whiteSpace: "nowrap", pointerEvents: "none" }, children: [
            paddingY,
            "px padding Y"
          ] }) })
        },
        `pad-y-${i}`
      )),
      showGapsY && gutterY > 0 && componentRows.length > 1 && componentRows.slice(0, -1).map((row, i) => {
        const gapTop = row.top + row.height;
        return /* @__PURE__ */ jsx(
          "div",
          {
            style: {
              position: "absolute",
              left: 0,
              right: 0,
              pointerEvents: "none",
              top: gapTop,
              height: gutterY,
              zIndex: 18,
              backgroundColor: `rgba(191,219,254,${0.6 * overlayOpacity})`,
              borderTop: `1px solid rgba(96,165,250,${0.7 * overlayOpacity})`,
              borderBottom: `1px solid rgba(96,165,250,${0.7 * overlayOpacity})`
            },
            children: showAnnotations && i === 0 && /* @__PURE__ */ jsxs("div", { style: { position: "absolute", left: "50%", top: "50%", transform: "translate(-50%,-50%)", fontSize: 11, fontFamily: "monospace", fontWeight: 600, background: `rgba(255,255,255,${0.9 * overlayOpacity})`, color: `rgba(37,99,235,${overlayOpacity})`, padding: "2px 6px", borderRadius: 4, whiteSpace: "nowrap", pointerEvents: "none" }, children: [
              gutterY,
              "px gap Y"
            ] })
          },
          `gap-y-${i}`
        );
      })
    ] });
  };
  const renderModularGrid = () => {
    const moduleSize = 64;
    const rows = Math.floor(800 / (moduleSize + gutter));
    return /* @__PURE__ */ jsx(
      "div",
      {
        className: "absolute inset-0 pointer-events-none transition-opacity duration-300",
        style: { opacity: overlayOpacity },
        children: /* @__PURE__ */ jsx(
          "div",
          {
            className: "h-full mx-auto grid",
            style: {
              gridTemplateColumns: `repeat(${columns}, 1fr)`,
              gridTemplateRows: `repeat(${rows}, ${moduleSize}px)`,
              gap: showGapsX ? `${gutter}px` : "0px",
              paddingLeft: `${margin}px`,
              paddingRight: `${margin}px`,
              maxWidth: containerMaxWidth
            },
            children: Array.from({ length: columns * rows }).map((_, i) => showColumns && /* @__PURE__ */ jsx(
              "div",
              {
                className: "bg-emerald-200/40 border border-emerald-400/60 transition-all duration-300"
              },
              i
            ))
          }
        )
      }
    );
  };
  const renderAsymmetricGrid = () => {
    const asymmetricColumns = "2fr 3fr 2fr 5fr";
    return /* @__PURE__ */ jsx(
      "div",
      {
        className: "absolute inset-0 pointer-events-none transition-opacity duration-300",
        style: { opacity: overlayOpacity },
        children: /* @__PURE__ */ jsx(
          "div",
          {
            className: "h-full mx-auto grid",
            style: {
              gridTemplateColumns: asymmetricColumns,
              gap: showGapsX ? `${gutter}px` : "0px",
              paddingLeft: `${margin}px`,
              paddingRight: `${margin}px`,
              maxWidth: containerMaxWidth
            },
            children: ["2fr", "3fr", "2fr", "5fr"].map((size, i) => showColumns && /* @__PURE__ */ jsx(
              "div",
              {
                className: "bg-orange-200/40 border border-orange-400/60 relative transition-all duration-300",
                children: showAnnotations && /* @__PURE__ */ jsx("div", { className: "absolute top-2 left-2 text-xs font-mono text-orange-700 font-bold bg-white/80 px-1.5 py-0.5 rounded", children: size })
              },
              i
            ))
          }
        )
      }
    );
  };
  if (type === "modular") return renderModularGrid();
  if (type === "asymmetric") return renderAsymmetricGrid();
  return renderColumnarGrid();
}
function BaselineGridOverlay() {
  const [baselineSize, setBaselineSize] = useState(8);
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    const updateFromCSSVars = () => {
      if (typeof window === "undefined") return;
      const root = getComputedStyle(document.documentElement);
      const baseline = root.getPropertyValue("--grid-baseline").trim();
      if (baseline) {
        setBaselineSize(parseInt(baseline) || 8);
      }
      const showBaseline = root.getPropertyValue("--grid-show-baseline").trim();
      setIsVisible(showBaseline === "1");
    };
    updateFromCSSVars();
    const observer = new MutationObserver(updateFromCSSVars);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["style"]
    });
    return () => observer.disconnect();
  }, []);
  if (!isVisible) return null;
  const lineCount = Math.ceil(window.innerHeight / baselineSize) + 10;
  return /* @__PURE__ */ jsxs("div", { className: "fixed inset-0 pointer-events-none z-[1] overflow-hidden", children: [
    Array.from({ length: lineCount }).map((_, i) => /* @__PURE__ */ jsx(
      "div",
      {
        className: "absolute left-0 right-0 border-t border-violet-300/20",
        style: {
          top: `${i * baselineSize}px`,
          height: "1px"
        }
      },
      `baseline-${i}`
    )),
    /* @__PURE__ */ jsxs("div", { className: "fixed bottom-16 left-4 bg-violet-600 text-white px-3 py-2 rounded-lg shadow-lg text-xs font-semibold flex items-center gap-2 z-50", style: { pointerEvents: "none" }, children: [
      /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-0.5", children: [
        /* @__PURE__ */ jsx("div", { className: "w-8 h-px bg-violet-300" }),
        /* @__PURE__ */ jsx("div", { className: "w-8 h-px bg-violet-300" }),
        /* @__PURE__ */ jsx("div", { className: "w-8 h-px bg-violet-300" })
      ] }),
      /* @__PURE__ */ jsxs("span", { children: [
        "Baseline Grid: ",
        baselineSize,
        "px"
      ] })
    ] })
  ] });
}
const DSS_SPACING_TOKENS = [0, 4, 8, 12, 16, 20, 24, 32, 40, 48, 56, 64];
const DSS_COLUMN_COUNTS = [4, 8, 12, 16];
function isToken(v) {
  return DSS_SPACING_TOKENS.includes(Math.round(v));
}
class AppErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { error: null };
  }
  static getDerivedStateFromError(error) {
    return { error };
  }
  componentDidCatch(error, info) {
    console.error("[GridInspector] Render error:", error, info);
  }
  render() {
    if (this.state.error) {
      return /* @__PURE__ */ jsxs("div", { style: {
        position: "fixed",
        top: 16,
        right: 16,
        zIndex: 999999,
        background: "#fee2e2",
        border: "1px solid #dc2626",
        borderRadius: 8,
        padding: "12px 16px",
        fontFamily: "monospace",
        fontSize: 12,
        color: "#dc2626",
        maxWidth: 360,
        pointerEvents: "auto"
      }, children: [
        /* @__PURE__ */ jsx("strong", { children: "GridInspector — Erro de Render" }),
        /* @__PURE__ */ jsx("br", {}),
        this.state.error.message
      ] });
    }
    return this.props.children;
  }
}
function ViolationBridge() {
  const { component, overlay, setViolations } = useGridSystem();
  useEffect(() => {
    const v = [];
    let n = 0;
    const check = (value, prop, label) => {
      if (!isToken(value)) {
        v.push({
          id: `v-${++n}`,
          type: "spacing_token",
          severity: "medium",
          message: `${label}: ${Math.round(value)}px não é um token DSS (use múltiplos de 4)`,
          affectedProperty: prop,
          affectedValue: Math.round(value)
        });
      }
    };
    check(component.gutter.x, "layout.gutter.x", "Gap X");
    check(component.gutter.y, "layout.gutter.y", "Gap Y");
    check(component.padding.x, "layout.padding.x", "Padding L/R");
    check(component.padding.y, "layout.padding.y", "Padding T/B");
    check(component.margin.x, "layout.margin.x", "Margin X");
    if (!DSS_COLUMN_COUNTS.includes(overlay.columns)) {
      v.push({
        id: `v-${++n}`,
        type: "column_count",
        severity: "low",
        message: `Colunas: ${overlay.columns} fora do padrão DSS (padrões: ${DSS_COLUMN_COUNTS.join(", ")})`,
        affectedProperty: "overlay.columns",
        affectedValue: overlay.columns
      });
    }
    setViolations(v);
  }, [component, overlay]);
  return null;
}
function GridOverlayBridge({ contentSelector }) {
  const { overlay, showGrid, showRows, highlightedElementIndex } = useGridSystem();
  if (!showGrid) return null;
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(
      GridOverlay,
      {
        columns: overlay.columns,
        gutter: overlay.gutter.x,
        margin: overlay.margin.x,
        padding: overlay.padding.x,
        gutterY: overlay.gutter.y,
        marginY: overlay.margin.y,
        paddingY: overlay.padding.y,
        showRows,
        showAnnotations: true,
        contentSelector,
        highlightedElementIndex
      }
    ),
    /* @__PURE__ */ jsx(BaselineGridOverlay, {})
  ] });
}
function GridInspectorApp({ config = {}, debug = false }) {
  if (debug) {
    console.log("[GridInspectorApp] Rendering with config:", config);
  }
  return /* @__PURE__ */ jsx(
    "div",
    {
      id: "grid-inspector-root",
      style: {
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        zIndex: 999999,
        // Neutralise --dss-layout-* vars so they don't cascade into the floating panel
        ["--dss-layout-gap-x"]: "0px",
        ["--dss-layout-gap-y"]: "0px",
        ["--dss-layout-margin-x"]: "0px",
        ["--dss-layout-margin-y"]: "0px",
        ["--dss-layout-padding-x"]: "0px",
        ["--dss-layout-padding-y"]: "0px"
      },
      children: /* @__PURE__ */ jsx(AppErrorBoundary, { children: /* @__PURE__ */ jsx(GridSystemProvider, { initialConfig: config, children: /* @__PURE__ */ jsxs(NestedGridProvider, { children: [
        /* @__PURE__ */ jsx(ViolationBridge, {}),
        /* @__PURE__ */ jsx(FloatingGridInspector, {}),
        /* @__PURE__ */ jsx(GridOverlayBridge, { contentSelector: config.contentSelector })
      ] }) }) })
    }
  );
}
function detectPageLayout(contentSelector) {
  if (!contentSelector || typeof document === "undefined") return null;
  const container = document.querySelector(contentSelector);
  if (!container) return null;
  const s = getComputedStyle(container);
  const gtc = s.gridTemplateColumns;
  const columns = gtc && gtc !== "none" && gtc.trim() !== "" ? gtc.trim().split(/\s+/).length : 12;
  const gapX = parseFloat(s.columnGap) || 0;
  const gapY = parseFloat(s.rowGap) || 0;
  const marginX = parseFloat(s.paddingLeft) || 0;
  const marginY = parseFloat(s.marginTop) || 0;
  const firstChild = container.children[0];
  const cs = firstChild ? getComputedStyle(firstChild) : null;
  const paddingX = cs ? parseFloat(cs.paddingLeft) || 0 : 0;
  const paddingY = cs ? parseFloat(cs.paddingTop) || 0 : 0;
  return { columns, gapX, gapY, marginX, marginY, paddingX, paddingY };
}
let currentRoot = null;
let containerElement = null;
function injectGridInspector(options = {}) {
  const {
    target = document.body,
    config = {},
    debug = false,
    zIndex = 999999
  } = options;
  if (debug) {
    console.log("[Grid Inspector] Injecting...", { options });
  }
  if (currentRoot) {
    if (debug) {
      console.log("[Grid Inspector] Cleaning up previous instance");
    }
    ejectGridInspector();
  }
  containerElement = document.createElement("div");
  containerElement.id = "sansys-grid-inspector-root";
  containerElement.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    z-index: ${zIndex};
  `;
  target.appendChild(containerElement);
  const detected = detectPageLayout(config == null ? void 0 : config.contentSelector);
  const initialConfig = detected ? {
    ...config,
    overlay: {
      columns: detected.columns,
      gutter: { x: detected.gapX, y: detected.gapY },
      margin: { x: detected.marginX, y: detected.marginY },
      padding: { x: detected.paddingX, y: detected.paddingY },
      visible: true,
      ...config.overlay
    },
    layout: {
      gutter: { x: detected.gapX, y: detected.gapY },
      margin: { x: detected.marginX, y: detected.marginY },
      padding: { x: detected.paddingX, y: detected.paddingY },
      autoColumnWidth: true,
      ...config.layout
    }
  } : config;
  if (debug && detected) {
    console.log("[Grid Inspector] Detected page layout:", detected);
  }
  currentRoot = createRoot(containerElement);
  currentRoot.render(/* @__PURE__ */ jsx(GridInspectorApp, { config: initialConfig, debug }));
  if (debug) {
    console.log("[Grid Inspector] ✅ Injected successfully");
  }
  if (typeof window !== "undefined") {
    window.__SANSYS_GRID_INSPECTOR__ = {
      eject: ejectGridInspector,
      toggle: toggleGridInspector,
      version: "1.0.0"
    };
  }
}
function ejectGridInspector() {
  if (currentRoot) {
    currentRoot.unmount();
    currentRoot = null;
  }
  if (containerElement && containerElement.parentNode) {
    containerElement.parentNode.removeChild(containerElement);
    containerElement = null;
  }
  if (typeof window !== "undefined") {
    delete window.__SANSYS_GRID_INSPECTOR__;
  }
}
function toggleGridInspector(options) {
  if (currentRoot) {
    ejectGridInspector();
  } else {
    injectGridInspector(options);
  }
}
function isGridInspectorActive() {
  return currentRoot !== null;
}
if (typeof window !== "undefined" && window.__SANSYS_GRID_INSPECTOR_BOOKMARKLET__) {
  console.log("[Grid Inspector] Bookmarklet mode detected - auto-injecting");
  injectGridInspector({ debug: true });
  const notification = document.createElement("div");
  notification.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    background: #10b981;
    color: white;
    padding: 12px 20px;
    border-radius: 8px;
    font-family: system-ui, -apple-system, sans-serif;
    font-size: 14px;
    font-weight: 500;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    z-index: 1000000;
    animation: slideIn 0.3s ease-out;
  `;
  notification.textContent = "✅ Grid Inspector ativado";
  const style = document.createElement("style");
  style.textContent = `
    @keyframes slideIn {
      from { transform: translateX(100%); opacity: 0; }
      to { transform: translateX(0); opacity: 1; }
    }
  `;
  document.head.appendChild(style);
  document.body.appendChild(notification);
  setTimeout(() => {
    notification.style.transition = "opacity 0.3s";
    notification.style.opacity = "0";
    setTimeout(() => notification.remove(), 300);
  }, 3e3);
}
export {
  GridInspectorApp,
  ejectGridInspector,
  getMcpServerUrl,
  getSimulatedViewportWidth,
  injectGridInspector,
  isGridInspectorActive,
  isMcpConnected,
  setMcpServerUrl,
  setSimulatedViewportWidth,
  toggleGridInspector
};
//# sourceMappingURL=grid-inspector.es.js.map
