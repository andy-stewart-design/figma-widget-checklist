declare global {
  interface WidgetAPI {
    Span: SpanComponent;
  }
  type SpanComponent = FunctionalWidget<TextProps>;
}

export {};
