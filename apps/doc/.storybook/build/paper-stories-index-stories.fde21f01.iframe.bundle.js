"use strict";(globalThis.webpackChunkyith_components_doc=globalThis.webpackChunkyith_components_doc||[]).push([[431],{"../../packages/components/src/paper/stories/index.stories.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{Default:()=>Default,Elevation:()=>Elevation,__namedExportsOrder:()=>__namedExportsOrder,default:()=>index_stories});var react=__webpack_require__("../../node_modules/.pnpm/react@18.2.0/node_modules/react/index.js"),paper=__webpack_require__("../../packages/components/src/paper/index.tsx"),build_module=__webpack_require__("../../packages/styles/build-module/index.js"),jsx_runtime=__webpack_require__("../../node_modules/.pnpm/react@18.2.0/node_modules/react/jsx-runtime.js");const BoxRoot=(0,build_module.zo)("div",{name:"Box",slot:"Root"})``,Box=react.forwardRef((function Box(_ref,ref){let{children,...other}=_ref;return(0,jsx_runtime.jsx)(BoxRoot,{...other,ref,children})})),box_Box=Box;try{Box.displayName="Box",Box.__docgenInfo={description:"",displayName:"Box",props:{sx:{defaultValue:null,description:"",name:"sx",required:!1,type:{name:"SxProps"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["../../packages/components/src/box/Box.tsx#Box"]={docgenInfo:Box.__docgenInfo,name:"Box",path:"../../packages/components/src/box/Box.tsx#Box"})}catch(__react_docgen_typescript_loader_error){}try{box.displayName="box",box.__docgenInfo={description:"",displayName:"box",props:{sx:{defaultValue:null,description:"",name:"sx",required:!1,type:{name:"SxProps"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["../../packages/components/src/box/index.tsx#box"]={docgenInfo:box.__docgenInfo,name:"box",path:"../../packages/components/src/box/index.tsx#box"})}catch(__react_docgen_typescript_loader_error){}const index_stories={title:"Components/Paper",component:paper.Z},Template=args=>(0,jsx_runtime.jsx)(paper.Z,{...args,sx:{padding:"16px 24px",display:"inline-flex"},children:"Hi! I'm a Paper."});Template.displayName="Template";const Default=Template.bind({}),ElevationTemplate=()=>(0,jsx_runtime.jsxs)(box_Box,{sx:{display:"flex",flexWrap:"wrap",background:"#f1f1f1",padding:"16px","& > :not(style)":{margin:8,width:128,height:128}},children:[(0,jsx_runtime.jsx)(paper.Z,{elevation:0}),(0,jsx_runtime.jsx)(paper.Z,{}),(0,jsx_runtime.jsx)(paper.Z,{elevation:4})]});ElevationTemplate.displayName="ElevationTemplate";const Elevation=ElevationTemplate.bind({});Default.parameters={...Default.parameters,docs:{...Default.parameters?.docs,source:{originalSource:"args => {\n  return <Paper {...args} sx={{\n    padding: '16px 24px',\n    display: 'inline-flex'\n  }}>\n        Hi! I'm a Paper.\n    </Paper>;\n}",...Default.parameters?.docs?.source}}},Elevation.parameters={...Elevation.parameters,docs:{...Elevation.parameters?.docs,source:{originalSource:"() => {\n  return <Box sx={{\n    display: 'flex',\n    flexWrap: 'wrap',\n    background: '#f1f1f1',\n    padding: '16px',\n    // @ts-ignore\n    '& > :not(style)': {\n      margin: 8,\n      width: 128,\n      height: 128\n    }\n  }}>\n        <Paper elevation={0} />\n        <Paper />\n        <Paper elevation={4} />\n    </Box>;\n}",...Elevation.parameters?.docs?.source}}};const __namedExportsOrder=["Default","Elevation"]},"../../packages/components/src/paper/index.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>paper_Paper});var build_module=__webpack_require__("../../packages/styles/build-module/index.js"),react=__webpack_require__("../../node_modules/.pnpm/react@18.2.0/node_modules/react/index.js"),jsx_runtime=__webpack_require__("../../node_modules/.pnpm/react@18.2.0/node_modules/react/jsx-runtime.js");const PaperRoot=(0,build_module.zo)("div",{name:"Paper",slot:"Root"})((_ref=>{var _theme$shadows$ownerS;let{ownerState,theme}=_ref;return{background:theme.palette.background.paper,color:theme.palette.text.primary,transition:"box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",...!ownerState.squared&&{borderRadius:theme.shape.borderRadius},...ownerState.elevation&&{boxShadow:null!==(_theme$shadows$ownerS=theme.shadows[ownerState.shadowColor][ownerState.elevation])&&void 0!==_theme$shadows$ownerS?_theme$shadows$ownerS:"none"},..."outlined"===ownerState.variant&&{border:`1px solid ${theme.color(ownerState.borderColor)}`}}})),Paper=(0,react.forwardRef)((function Paper(_ref2,ref){let{children,elevation:elevationProp,variant="elevation",squared=!1,shadowColor:shadowColorProp,borderColor="border.primary",...other}=_ref2;const ownerState={elevation:null!=elevationProp?elevationProp:"elevation"===variant?1:0,variant,squared,shadowColor:null!=shadowColorProp?shadowColorProp:"elevation"===variant?"primary":"secondary",borderColor};return(0,jsx_runtime.jsx)(PaperRoot,{ref,ownerState,...other,children})})),paper_Paper=Paper;try{Paper.displayName="Paper",Paper.__docgenInfo={description:"",displayName:"Paper",props:{variant:{defaultValue:{value:"elevation"},description:"The variant to use.",name:"variant",required:!1,type:{name:"enum",value:[{value:'"outlined"'},{value:'"elevation"'}]}},sx:{defaultValue:null,description:"Sx props.",name:"sx",required:!1,type:{name:"SxProps"}},borderColor:{defaultValue:{value:"border.primary"},description:"The border color to use.",name:"borderColor",required:!1,type:{name:"enum",value:[{value:'"text.primary"'},{value:'"text.secondary"'},{value:'"primary.main"'},{value:'"primary.light"'},{value:'"primary.contrastText"'},{value:'"secondary.main"'},{value:'"secondary.light"'},{value:'"secondary.contrastText"'},{value:'"warning.main"'},{value:'"warning.light"'},{value:'"warning.contrastText"'},{value:'"error.main"'},{value:'"error.light"'},{value:'"error.contrastText"'},{value:'"info.main"'},{value:'"info.light"'},{value:'"info.contrastText"'},{value:'"success.main"'},{value:'"success.light"'},{value:'"success.contrastText"'},{value:'"background.default"'},{value:'"background.dropdown"'},{value:'"background.paper"'},{value:'"background.backdrop"'},{value:'"border.primary"'},{value:'"border.secondary"'}]}},elevation:{defaultValue:null,description:"Shadow depth.",name:"elevation",required:!1,type:{name:"number"}},squared:{defaultValue:{value:"false"},description:"If `true`, rounded corners are disabled.",name:"squared",required:!1,type:{name:"boolean"}},shadowColor:{defaultValue:null,description:"The shadow color to use.",name:"shadowColor",required:!1,type:{name:"enum",value:[{value:'"primary"'},{value:'"secondary"'},{value:'"primaryGlow"'},{value:'"secondaryGlow"'}]}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["../../packages/components/src/paper/Paper.tsx#Paper"]={docgenInfo:Paper.__docgenInfo,name:"Paper",path:"../../packages/components/src/paper/Paper.tsx#Paper"})}catch(__react_docgen_typescript_loader_error){}try{paper.displayName="paper",paper.__docgenInfo={description:"",displayName:"paper",props:{variant:{defaultValue:{value:"elevation"},description:"The variant to use.",name:"variant",required:!1,type:{name:"enum",value:[{value:'"outlined"'},{value:'"elevation"'}]}},sx:{defaultValue:null,description:"Sx props.",name:"sx",required:!1,type:{name:"SxProps"}},borderColor:{defaultValue:{value:"border.primary"},description:"The border color to use.",name:"borderColor",required:!1,type:{name:"enum",value:[{value:'"text.primary"'},{value:'"text.secondary"'},{value:'"primary.main"'},{value:'"primary.light"'},{value:'"primary.contrastText"'},{value:'"secondary.main"'},{value:'"secondary.light"'},{value:'"secondary.contrastText"'},{value:'"warning.main"'},{value:'"warning.light"'},{value:'"warning.contrastText"'},{value:'"error.main"'},{value:'"error.light"'},{value:'"error.contrastText"'},{value:'"info.main"'},{value:'"info.light"'},{value:'"info.contrastText"'},{value:'"success.main"'},{value:'"success.light"'},{value:'"success.contrastText"'},{value:'"background.default"'},{value:'"background.dropdown"'},{value:'"background.paper"'},{value:'"background.backdrop"'},{value:'"border.primary"'},{value:'"border.secondary"'}]}},elevation:{defaultValue:null,description:"Shadow depth.",name:"elevation",required:!1,type:{name:"number"}},squared:{defaultValue:{value:"false"},description:"If `true`, rounded corners are disabled.",name:"squared",required:!1,type:{name:"boolean"}},shadowColor:{defaultValue:null,description:"The shadow color to use.",name:"shadowColor",required:!1,type:{name:"enum",value:[{value:'"primary"'},{value:'"secondary"'},{value:'"primaryGlow"'},{value:'"secondaryGlow"'}]}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["../../packages/components/src/paper/index.tsx#paper"]={docgenInfo:paper.__docgenInfo,name:"paper",path:"../../packages/components/src/paper/index.tsx#paper"})}catch(__react_docgen_typescript_loader_error){}}}]);