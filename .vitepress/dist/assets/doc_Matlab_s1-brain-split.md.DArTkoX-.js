import{_ as i,c as a,o as n,ae as l}from"./chunks/framework.NcZqgvTs.js";const g=JSON.parse('{"title":"s1_brian_split.m","description":"","frontmatter":{"outline":"deep"},"headers":[],"relativePath":"doc/Matlab/s1-brain-split.md","filePath":"doc/Matlab/s1-brain-split.md"}'),p={name:"doc/Matlab/s1-brain-split.md"};function k(t,s,h,e,E,r){return n(),a("div",null,s[0]||(s[0]=[l(`<h1 id="s1-brian-split-m" tabindex="-1">s1_brian_split.m <a class="header-anchor" href="#s1-brian-split-m" aria-label="Permalink to &quot;s1_brian_split.m&quot;">​</a></h1><div class="warning custom-block"><p class="custom-block-title">WARNING</p><p>Copyright © 2025-present Zhirong Li. If U use, plz site.</p></div><div class="language-matlab vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">matlab</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">file = </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;C:/Users/Administrator/Desktop/diabete_metabolism_brain/Results/brain_structure/cer/Cerebellum-MNIflirt-maxprob-thr50-1mm.nii&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">nii = spm_vol(file)</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">data  = spm_read_vols(nii)</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">id = [</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">1</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">28</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">]</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">for</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> i = </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">1</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:length(id)</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    mask = zeros(size(data));</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    mask(data </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">==</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> id(i)) = </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">1</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    maskNii = nii;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    maskNii.fname = [</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;brain_mask_&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> num2str(id(i)) </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;.nii&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">];</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    spm_write_vol(maskNii, mask);</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">end</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">file = </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;C:/Users/Administrator/Desktop/diabete_metabolism_brain/Results/brain_structure/cor/HarvardOxford-cort-maxprob-thr50-1mm.nii&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">nii = spm_vol(file)</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">data  = spm_read_vols(nii)</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">id = [</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">1</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">48</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">]</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">for</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> i = </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">1</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:length(id)</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    mask = zeros(size(data));</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    mask(data </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">==</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> id(i)) = </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">1</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    maskNii = nii;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    maskNii.fname = [</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;brain_mask_&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> num2str(id(i)) </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;.nii&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">];</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    spm_write_vol(maskNii, mask);</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">end</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">file = </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;C:/Users/Administrator/Desktop/diabete_metabolism_brain/Results/brain_structure/sub/HarvardOxford-sub-maxprob-thr50-1mm.nii&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">nii = spm_vol(file)</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">data  = spm_read_vols(nii)</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">id = [</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">1</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">21</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">]</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">for</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> i = </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">1</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:length(id)</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    mask = zeros(size(data));</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    mask(data </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">==</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> id(i)) = </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">1</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    maskNii = nii;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    maskNii.fname = [</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;brain_mask_&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> num2str(id(i)) </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;.nii&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">];</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    spm_write_vol(maskNii, mask);</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">end</span></span></code></pre></div>`,3)]))}const y=i(p,[["render",k]]);export{g as __pageData,y as default};
