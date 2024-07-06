struct VertexOutput {
    @builtin(position) pos: vec4<f32>,
};

@fragment
fn main(in: VertexOutput) -> @location(0) vec4f {
  return vec4(abs(pos.x), abs(pos.y), 0.0, 1.0);
}