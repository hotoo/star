version = $(shell cat package.json | grep '"version"' | awk -F'"' '{print $$4}')

install:
	@spm install

watch:
	@spm doc watch

publish-doc: clear
	@spm doc publish

publish: publish-doc
	@spm publish
	@git tag $(version)
	@git push origin $(version)

test:
	@spm test

clear:
	@rm -rf _site
